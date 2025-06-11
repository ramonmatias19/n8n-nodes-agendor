import {
	IDataObject,
	IHookFunctions,
	ILoadOptionsFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
	NodeConnectionType,
	NodeOperationError,
	IHttpRequestMethods,
} from 'n8n-workflow';

export class AgendorTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Agendor Trigger',
		name: 'agendorTrigger',
		icon: 'file:logo.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Disparos baseados em eventos do Agendor',
		defaults: {
			name: 'Agendor Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'agendorApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'agendor',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Activity Created',
						value: 'activity.created',
						description: 'Quando uma nova atividade é criada',
					},
					{
						name: 'Activity Deleted',
						value: 'activity.deleted',
						description: 'Quando uma atividade é excluída',
					},
					{
						name: 'Activity Updated',
						value: 'activity.updated',
						description: 'Quando uma atividade é atualizada',
					},
					{
						name: 'Deal Created',
						value: 'deal.created',
						description: 'Quando um novo negócio é criado',
					},
					{
						name: 'Deal Deleted',
						value: 'deal.deleted',
						description: 'Quando um negócio é excluído',
					},
					{
						name: 'Deal Lost',
						value: 'deal.lost',
						description: 'Quando um negócio é perdido',
					},
					{
						name: 'Deal Updated',
						value: 'deal.updated',
						description: 'Quando um negócio é atualizado',
					},
					{
						name: 'Deal Won',
						value: 'deal.won',
						description: 'Quando um negócio é ganho',
					},
					{
						name: 'Organization Created',
						value: 'organization.created',
						description: 'Quando uma nova organização é criada',
					},
					{
						name: 'Organization Deleted',
						value: 'organization.deleted',
						description: 'Quando uma organização é excluída',
					},
					{
						name: 'Organization Updated',
						value: 'organization.updated',
						description: 'Quando uma organização é atualizada',
					},
					{
						name: 'Person Created',
						value: 'person.created',
						description: 'Quando uma nova pessoa é criada',
					},
					{
						name: 'Person Deleted',
						value: 'person.deleted',
						description: 'Quando uma pessoa é excluída',
					},
					{
						name: 'Person Updated',
						value: 'person.updated',
						description: 'Quando uma pessoa é atualizada',
					},
				],
				default: 'deal.created',
				required: true,
				description: 'Evento que dispara o webhook',
			},
			{
				displayName: 'Filter Options',
				name: 'filterOptions',
				type: 'collection',
				placeholder: 'Adicionar Filtro',
				default: {},
				options: [
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
						description: 'Filtrar por ID de usuário específico',
						placeholder: '12345',
					},
					{
						displayName: 'Funnel ID',
						name: 'funnelId',
						type: 'string',
						default: '',
						description: 'Filtrar por ID de funil específico',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/event': ['deal.created', 'deal.updated', 'deal.deleted', 'deal.won', 'deal.lost'],
							},
						},
					},
					{
						displayName: 'Organization ID',
						name: 'organizationId',
						type: 'string',
						default: '',
						description: 'Filtrar por ID de organização específica',
						placeholder: '12345',
					},
				],
			},
		],
	};

	// @ts-ignore
	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				
				try {
					const webhooks = await agendorApiRequest.call(this, 'GET', '/webhooks');
					
					if (webhooks?.data) {
						for (const webhook of webhooks.data) {
							if (webhook.url === webhookUrl && webhook.event === event) {
								// Webhook exists
								const webhookId = webhook.id;
								// Store webhook ID in context for later use
								this.getWorkflowStaticData('node').webhookId = webhookId;
								return true;
							}
						}
					}
				} catch (error) {
					// API might not support webhooks or endpoint doesn't exist
					console.log('Webhook check failed, creating new webhook:', error);
				}
				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const event = this.getNodeParameter('event') as string;
				const filterOptions = this.getNodeParameter('filterOptions') as IDataObject;

				const body: IDataObject = {
					url: webhookUrl,
					event,
					active: true,
				};

				// Add filters if specified
				if (filterOptions.userId) {
					body.user_id = filterOptions.userId;
				}
				if (filterOptions.funnelId) {
					body.funnel_id = filterOptions.funnelId;
				}
				if (filterOptions.organizationId) {
					body.organization_id = filterOptions.organizationId;
				}

				try {
					const responseData = await agendorApiRequest.call(this, 'POST', '/webhooks', body);

					if (responseData?.data?.id) {
						// Store webhook ID in context for later use
						this.getWorkflowStaticData('node').webhookId = responseData.data.id.toString();
						return true;
					}
				} catch (error) {
					// Webhook creation failed, but we'll still return true to allow manual configuration
					console.log('Webhook creation failed:', error);
					return true;
				}

				return false;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookId = this.getWorkflowStaticData('node').webhookId as string;

				if (!webhookId) {
					return true;
				}

				try {
					await agendorApiRequest.call(this, 'DELETE', `/webhooks/${webhookId}`);
				} catch (error) {
					// Webhook deletion failed, but we'll return true to not block deactivation
					console.log('Webhook deletion failed:', error);
					return true;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const bodyData = this.getBodyData() as IDataObject;

		// Basic webhook validation
		if (!bodyData || typeof bodyData !== 'object') {
			throw new NodeOperationError(this.getNode(), 'Invalid webhook payload received');
		}

		// Extract event information
		const event = this.getNodeParameter('event') as string;
		const timestamp = new Date().toISOString();

		// Enhance data with metadata
		const responseData: IDataObject = {
			event,
			timestamp,
			webhook_id: req.headers['x-webhook-id'] || '',
			...bodyData,
		};

		return {
			workflowData: [[{ json: responseData }]],
		};
	}
}

async function agendorApiRequest(
	this: IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: string,
	resource: string,
	body: any = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('agendorApi');
	
	const options = {
		method: method as IHttpRequestMethods,
		body,
		qs,
		url: `https://api.agendor.com.br/v3${resource}`,
		headers: {
			Authorization: `Token ${credentials.apiKey}`,
			'Content-Type': 'application/json',
		},
		json: true,
	};

	try {
		if (Object.keys(body).length === 0) {
			delete options.body;
		}

		return await this.helpers.request(options);
	} catch (error) {
		throw new NodeOperationError(this.getNode(), error as Error);
	}
} 