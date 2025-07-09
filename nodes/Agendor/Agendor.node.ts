import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class Agendor implements INodeType {
	description: INodeTypeDescription & { usableAsTool?: boolean } = {
		displayName: 'Agendor',
		name: 'agendor',
		icon: 'file:logo.svg',
		group: ['tool'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Trabalhe com dados da API do Agendor CRM',
		defaults: {
			name: 'Agendor',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'agendorApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.agendor.com.br/v3',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: '=Token {{$credentials.apiToken}}',
			},
		},
		properties: [
			// Resource selector
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Activity',
						value: 'activities',
						description: 'Gerenciar atividades e tarefas',
					},
					{
						name: 'Deal',
						value: 'deals',
						description: 'Gerenciar negócios/oportunidades',
					},
					{
						name: 'Funnel',
						value: 'funnels',
						description: 'Gerenciar funis de vendas',
					},
					{
						name: 'Organization',
						value: 'organizations',
						description: 'Gerenciar organizações/empresas',
					},
					{
						name: 'Person',
						value: 'people',
						description: 'Gerenciar pessoas/contatos',
					},
					{
						name: 'Product',
						value: 'products',
						description: 'Gerenciar produtos e serviços',
					},
					{
						name: 'Tag',
						value: 'tags',
						description: 'Gerenciar tags e categorias',
					},
					{
						name: 'User',
						value: 'users',
						description: 'Gerenciar usuários',
					},
				],
				default: 'people',
			},

			// ===========================================
			// ACTIVITIES OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['activities'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar atividade',
						description: 'Criar uma nova atividade ou tarefa',
						routing: {
							request: {
								method: 'POST',
								url: '/activities',
								body: {
									type: '={{$parameter["activityType"]}}',
									text: '={{$parameter["text"]}}',
									datetime: '={{$parameter["datetime"] || undefined}}',
									deal_id: '={{$parameter["dealId"] || undefined}}',
									person_id: '={{$parameter["personId"] || undefined}}',
									organization_id: '={{$parameter["organizationId"] || undefined}}',
									user_id: '={{$parameter["userId"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar atividade',
						description: 'Deletar uma atividade',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/activities/{{$parameter["activityId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter atividade',
						description: 'Obter uma atividade específica por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/activities/{{$parameter["activityId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar atividades',
						description: 'Recuperar múltiplas atividades',
						routing: {
							request: {
								method: 'GET',
								url: '/activities',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar atividade',
						description: 'Atualizar informações da atividade',
						routing: {
							request: {
								method: 'PUT',
								url: '=/activities/{{$parameter["activityId"]}}',
								body: {
									type: '={{$parameter["activityType"] || undefined}}',
									text: '={{$parameter["text"] || undefined}}',
									datetime: '={{$parameter["datetime"] || undefined}}',
									deal_id: '={{$parameter["dealId"] || undefined}}',
									person_id: '={{$parameter["personId"] || undefined}}',
									organization_id: '={{$parameter["organizationId"] || undefined}}',
									user_id: '={{$parameter["userId"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// FUNNELS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['funnels'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar funis',
						description: 'Recuperar todos os funis de vendas',
						routing: {
							request: {
								method: 'GET',
								url: '/funnels',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter funil',
						description: 'Obter um funil específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/funnels/{{$parameter["funnelId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// PRODUCTS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['products'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar produto',
						description: 'Criar um novo produto ou serviço',
						routing: {
							request: {
								method: 'POST',
								url: '/products',
								body: {
									name: '={{$parameter["name"]}}',
									code: '={{$parameter["code"] || undefined}}',
									unit: '={{$parameter["unit"] || undefined}}',
									unit_price: '={{$parameter["unitPrice"] || undefined}}',
									cost_price: '={{$parameter["costPrice"] || undefined}}',
									description: '={{$parameter["description"] || undefined}}',
									category_id: '={{$parameter["categoryId"] || undefined}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar produto',
						description: 'Deletar um produto',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/products/{{$parameter["productId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter produto',
						description: 'Obter um produto específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/products/{{$parameter["productId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar produtos',
						description: 'Recuperar múltiplos produtos',
						routing: {
							request: {
								method: 'GET',
								url: '/products',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar produto',
						description: 'Atualizar informações do produto',
						routing: {
							request: {
								method: 'PUT',
								url: '=/products/{{$parameter["productId"]}}',
								body: {
									name: '={{$parameter["name"] || undefined}}',
									code: '={{$parameter["code"] || undefined}}',
									unit: '={{$parameter["unit"] || undefined}}',
									unit_price: '={{$parameter["unitPrice"] || undefined}}',
									cost_price: '={{$parameter["costPrice"] || undefined}}',
									description: '={{$parameter["description"] || undefined}}',
									category_id: '={{$parameter["categoryId"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// TAGS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['tags'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar tag',
						description: 'Criar uma nova tag',
						routing: {
							request: {
								method: 'POST',
								url: '/tags',
								body: {
									name: '={{$parameter["name"]}}',
									color: '={{$parameter["color"] || "#000000"}}',
								},
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar tag',
						description: 'Deletar uma tag',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/tags/{{$parameter["tagId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar tags',
						description: 'Recuperar todas as tags',
						routing: {
							request: {
								method: 'GET',
								url: '/tags',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar tag',
						description: 'Atualizar informações da tag',
						routing: {
							request: {
								method: 'PUT',
								url: '=/tags/{{$parameter["tagId"]}}',
								body: {
									name: '={{$parameter["name"] || undefined}}',
									color: '={{$parameter["color"] || undefined}}',
								},
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// USERS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['users'],
					},
				},
				options: [
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar usu rios',
						description: 'Recuperar múltiplos usuários',
						routing: {
							request: {
								method: 'GET',
								url: '/users',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter usu rios',
						description: 'Obter um usuário específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/users/{{$parameter["userId"]}}',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar usu rios',
						description: 'Atualizar informações do usuário',
						routing: {
							request: {
								method: 'PUT',
								url: '=/users/{{$parameter["userId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// ===========================================
			// ACTIVITIES PARAMETERS
			// ===========================================
			{
				displayName: 'Activity ID',
				name: 'activityId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activities'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'O ID da atividade',
				placeholder: '12345',
			},
			{
				displayName: 'Activity Type',
				name: 'activityType',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['activities'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						name: 'Call',
						value: 'call',
						description: 'Ligação telefônica',
					},
					{
						name: 'Email',
						value: 'email',
						description: 'Envio de email',
					},
					{
						name: 'Meeting',
						value: 'meeting',
						description: 'Reunião',
					},
					{
						name: 'Note',
						value: 'note',
						description: 'Anotação',
					},
					{
						name: 'Task',
						value: 'task',
						description: 'Tarefa geral',
					},
				],
				default: 'task',
				description: 'Tipo da atividade',
			},
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['activities'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Texto/descrição da atividade',
				placeholder: 'Ligar para o cliente sobre proposta',
				typeOptions: {
					rows: 3,
				},
			},
			{
				displayName: 'Date and Time',
				name: 'datetime',
				type: 'dateTime',
				displayOptions: {
					show: {
						resource: ['activities'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Data e hora da atividade (opcional)',
			},

			// ===========================================
			// FUNNELS PARAMETERS
			// ===========================================
			{
				displayName: 'Funnel ID',
				name: 'funnelId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['funnels'],
						operation: ['get'],
					},
				},
				default: '',
				description: 'O ID do funil',
				placeholder: '12345',
			},

			// ===========================================
			// PRODUCTS PARAMETERS
			// ===========================================
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'O ID do produto',
				placeholder: '12345',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['products', 'tags'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Nome do item',
				placeholder: 'Software de CRM',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['products', 'tags'],
						operation: ['update'],
					},
				},
				default: '',
				description: 'Nome do item (deixe vazio para não alterar)',
				placeholder: 'Software de CRM',
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Código do produto (SKU)',
				placeholder: 'PROD-001',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Descrição detalhada do produto',
				placeholder: 'Software completo de CRM para gestão de vendas...',
			},
			{
				displayName: 'Unit',
				name: 'unit',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Unidade de medida',
				placeholder: 'unidade, kg, litro, etc.',
			},
			{
				displayName: 'Unit Price',
				name: 'unitPrice',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberStepSize: 0.01,
				},
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Preço unitário em centavos',
				placeholder: '1000',
			},
			{
				displayName: 'Cost Price',
				name: 'costPrice',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberStepSize: 0.01,
				},
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Preço de custo em centavos',
				placeholder: '500',
			},
			{
				displayName: 'Category ID',
				name: 'categoryId',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['products'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'ID da categoria do produto (opcional)',
				placeholder: '123',
			},

			// ===========================================
			// TAGS PARAMETERS
			// ===========================================
			{
				displayName: 'Tag ID',
				name: 'tagId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['update', 'delete'],
					},
				},
				default: '',
				description: 'O ID da tag',
				placeholder: '12345',
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				displayOptions: {
					show: {
						resource: ['tags'],
						operation: ['create', 'update'],
					},
				},
				default: '#000000',
				description: 'Cor da tag em formato hexadecimal',
			},

			// User ID field for get/update operations
			{
				displayName: 'User ID',
				name: 'userId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['users'],
						operation: ['get', 'update'],
					},
				},
				default: '',
				description: 'O ID do usuário (formato numérico)',
				placeholder: '12345',
			},

			// ===========================================
			// ORGANIZATIONS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organizations'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar organiza es',
						description: 'Criar uma nova organização',
						routing: {
							request: {
								method: 'POST',
								url: '/organizations',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar organiza es',
						description: 'Deletar uma organização',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/organizations/{{$parameter["organizationId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter organiza es',
						description: 'Obter uma organização específica por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/organizations/{{$parameter["organizationId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar organiza es',
						description: 'Recuperar múltiplas organizações',
						routing: {
							request: {
								method: 'GET',
								url: '/organizations',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar organiza es',
						description: 'Atualizar informações da organização',
						routing: {
							request: {
								method: 'PUT',
								url: '=/organizations/{{$parameter["organizationId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// Organization ID field
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organizations'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'O ID da organização (formato numérico)',
				placeholder: '12345',
			},

			// Organization fields for create/update
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['organizations'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Nome da organização',
				placeholder: 'Empresa ABC Ltda',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},

			// ===========================================
			// PEOPLE OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['people'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar pessoa',
						description: 'Criar uma nova pessoa',
						routing: {
							request: {
								method: 'POST',
								url: '/people',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar pessoa',
						description: 'Deletar uma pessoa',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/people/{{$parameter["personId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter pessoa',
						description: 'Obter uma pessoa específica por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/people/{{$parameter["personId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar pessoas',
						description: 'Recuperar múltiplas pessoas',
						routing: {
							request: {
								method: 'GET',
								url: '/people',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar pessoa',
						description: 'Atualizar informações da pessoa',
						routing: {
							request: {
								method: 'PUT',
								url: '=/people/{{$parameter["personId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// Person ID field
			{
				displayName: 'Person ID',
				name: 'personId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['people'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'O ID da pessoa (formato numérico)',
				placeholder: '12345',
			},

			// Person fields for create/update
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['people'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Nome da pessoa',
				placeholder: 'João Silva',
				routing: {
					send: {
						type: 'body',
						property: 'name',
					},
				},
			},

			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				typeOptions: {
					validation: [
						{
							type: 'regex',
							properties: {
								regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
								errorMessage: 'Por favor insira um email válido',
							},
						},
					],
				},
				displayOptions: {
					show: {
						resource: ['people'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Endereço de email da pessoa',
				placeholder: 'joao@empresa.com',
				routing: {
					send: {
						type: 'body',
						property: 'email',
					},
				},
			},

			// ===========================================
			// DEALS OPERATIONS
			// ===========================================
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['deals'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Criar neg cios',
						description: 'Criar um novo negócio',
						routing: {
							request: {
								method: 'POST',
								url: '/deals',
							},
						},
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Deletar neg cios',
						description: 'Deletar um negócio',
						routing: {
							request: {
								method: 'DELETE',
								url: '=/deals/{{$parameter["dealId"]}}',
							},
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Obter neg cios',
						description: 'Obter um negócio específico por ID',
						routing: {
							request: {
								method: 'GET',
								url: '=/deals/{{$parameter["dealId"]}}',
							},
						},
					},
					{
						name: 'Get Many',
						value: 'getMany',
						action: 'Listar neg cios',
						description: 'Recuperar múltiplos negócios',
						routing: {
							request: {
								method: 'GET',
								url: '/deals',
							},
						},
					},
					{
						name: 'Update',
						value: 'update',
						action: 'Atualizar neg cios',
						description: 'Atualizar informações do negócio',
						routing: {
							request: {
								method: 'PUT',
								url: '=/deals/{{$parameter["dealId"]}}',
							},
						},
					},
				],
				default: 'getMany',
			},

			// Deal ID field
			{
				displayName: 'Deal ID',
				name: 'dealId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deals'],
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				description: 'O ID do negócio (formato numérico)',
				placeholder: '12345',
			},

			// Deal fields for create/update
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['deals'],
						operation: ['create', 'update'],
					},
				},
				default: '',
				description: 'Título do negócio',
				placeholder: 'Venda de Software - Empresa ABC',
				routing: {
					send: {
						type: 'body',
						property: 'title',
					},
				},
			},

			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberStepSize: 0.01,
				},
				displayOptions: {
					show: {
						resource: ['deals'],
						operation: ['create', 'update'],
					},
				},
				default: 0,
				description: 'Valor do negócio em centavos (ex: 1000 = R$ 10,00)',
				placeholder: '50000',
				routing: {
					send: {
						type: 'body',
						property: 'value',
					},
				},
			},

			// ===========================================
			// ADDITIONAL OPTIONS
			// ===========================================
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Adicionar Campo',
				default: {},
				displayOptions: {
					show: {
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
						description: 'Endereço completo',
						placeholder: 'Rua das Flores, 123 - São Paulo/SP',
						displayOptions: {
							show: {
								'/resource': ['people', 'organizations'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'address',
							},
						},
					},
					{
						displayName: 'CNPJ',
						name: 'cnpj',
						type: 'string',
						default: '',
						description: 'CNPJ da organização (apenas números)',
						placeholder: '12345678000199',
						displayOptions: {
							show: {
								'/resource': ['organizations'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'cnpj',
							},
						},
					},
					{
						displayName: 'CPF',
						name: 'cpf',
						type: 'string',
						default: '',
						description: 'CPF da pessoa (apenas números)',
						placeholder: '12345678900',
						displayOptions: {
							show: {
								'/resource': ['people'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'cpf',
							},
						},
					},
					{
						displayName: 'Deal ID',
						name: 'dealId',
						type: 'string',
						default: '',
						description: 'ID do negócio relacionado à atividade',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/resource': ['activities'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'deal_id',
							},
						},
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						typeOptions: {
							rows: 3,
						},
						default: '',
						description: 'Descrição do item',
						placeholder: 'Detalhes adicionais sobre...',
						routing: {
							send: {
								type: 'body',
								property: 'description',
							},
						},
					},
					{
						displayName: 'Organization ID',
						name: 'organizationId',
						type: 'string',
						default: '',
						description: 'ID da organização relacionada',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/resource': ['people', 'deals'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'organizationId',
							},
						},
					},
					{
						displayName: 'Organization ID',
						name: 'organizationId',
						type: 'string',
						default: '',
						description: 'ID da organização relacionada à atividade',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/resource': ['activities'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'organization_id',
							},
						},
					},
					{
						displayName: 'Person ID',
						name: 'personId',
						type: 'string',
						default: '',
						description: 'ID da pessoa responsável por este negócio',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/resource': ['deals'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'personId',
							},
						},
					},
					{
						displayName: 'Person ID',
						name: 'personId',
						type: 'string',
						default: '',
						description: 'ID da pessoa relacionada à atividade',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/resource': ['activities'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'person_id',
							},
						},
					},
					{
						displayName: 'Phone',
						name: 'phone',
						type: 'string',
						default: '',
						description: 'Número de telefone',
						placeholder: '(11) 99999-9999',
						displayOptions: {
							show: {
								'/resource': ['people', 'organizations'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'phone',
							},
						},
					},
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'string',
						default: '',
						description: 'ID do usuário responsável pela atividade',
						placeholder: '12345',
						displayOptions: {
							show: {
								'/resource': ['activities'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'user_id',
							},
						},
					},
					{
						displayName: 'Website',
						name: 'website',
						type: 'string',
						default: '',
						description: 'URL do website',
						placeholder: 'https://www.exemplo.com.br',
						displayOptions: {
							show: {
								'/resource': ['organizations'],
							},
						},
						routing: {
							send: {
								type: 'body',
								property: 'website',
							},
						},
					},
				],
			},

			// Query parameters for list operations
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Adicionar Opção',
				default: {},
				displayOptions: {
					show: {
						operation: ['getMany'],
					},
				},
				options: [
					{
						displayName: 'Order By',
						name: 'orderBy',
						type: 'options',
						options: [
							{
								name: 'ID',
								value: 'id',
							},
							{
								name: 'Nome',
								value: 'name',
							},
							{
								name: 'Criado Em',
								value: 'created_at',
							},
							{
								name: 'Atualizado Em',
								value: 'updated_at',
							},
						],
						default: 'id',
						description: 'Campo para ordenação dos resultados',
						routing: {
							send: {
								type: 'query',
								property: 'order_by',
							},
						},
					},
					{
						displayName: 'Order Direction',
						name: 'orderDirection',
						type: 'options',
						options: [
							{
								name: 'Crescente',
								value: 'asc',
							},
							{
								name: 'Decrescente',
								value: 'desc',
							},
						],
						default: 'asc',
						description: 'Direção da ordenação',
						routing: {
							send: {
								type: 'query',
								property: 'order_direction',
							},
						},
					},
					{
						displayName: 'Page',
						name: 'page',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 1,
						description: 'Número da página a recuperar',
						routing: {
							send: {
								type: 'query',
								property: 'page',
							},
						},
					},
					{
						displayName: 'Per Page',
						name: 'perPage',
						type: 'number',
						typeOptions: {
							minValue: 1,
							maxValue: 100,
						},
						default: 20,
						description: 'Número de itens por página (máximo 100)',
						routing: {
							send: {
								type: 'query',
								property: 'per_page',
							},
						},
					},
					{
						displayName: 'Search',
						name: 'search',
						type: 'string',
						default: '',
						description: 'Termo de busca para filtrar os resultados',
						placeholder: 'João Silva',
						routing: {
							send: {
								type: 'query',
								property: 'search',
							},
						},
					},
				],
			},
		],
	};
}
