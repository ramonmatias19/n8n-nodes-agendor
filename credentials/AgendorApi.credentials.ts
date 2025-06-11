import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AgendorApi implements ICredentialType {
	        name = 'agendorApi';
	displayName = 'Agendor API';
	documentationUrl = 'https://api.agendor.com.br/docs/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Seu Token de API do Agendor. Obtenha em Menu > Integrações > API Token na sua conta Agendor.',
			placeholder: 'agendor_api_token_xxxxxxxxxxxxx',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Token {{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.agendor.com.br/v3',
			url: '/users/me',
			method: 'GET',
		},
		rules: [
			{
				type: 'responseSuccessBody',
				properties: {
					key: 'data.id',
					value: undefined,
					message: 'Token de API inválido. Verifique se o token está correto e ativo.',
				},
			},
		],
	};
}
