import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';

/**
 * Build the Apify Actor input from node parameters.
 * Only the real Actor inputs are sent; the Output / Fields parameters shape the
 * data we return, they are not part of the Actor input.
 */
export function buildActorInput(
	context: IExecuteFunctions,
	itemIndex: number,
	defaultInput: Record<string, any>,
): Record<string, any> {
	return {
		...defaultInput,
		query: context.getNodeParameter('query', itemIndex),
		where: context.getNodeParameter('where', itemIndex),
		maxResultsPerQuery: context.getNodeParameter('maxResultsPerQuery', itemIndex),
	};
}

const resourceProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Search Result',
				value: 'searchResult',
			},
		],
		default: 'searchResult',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['searchResult'],
			},
		},
		options: [
			{
				name: 'Search',
				value: 'search',
				action: 'Search and return results',
				description: 'Search Naver and return one item per result',
			},
		],
		default: 'search',
	},
];

const actorProperties: INodeProperties[] = [
	{
		displayName: 'Search Query',
		name: 'query',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'e.g. 서울 맛집',
		description: 'The query to search Naver for',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
	{
		displayName: 'Search Type',
		name: 'where',
		type: 'options',
		options: [
			{ name: 'All (Integrated)', value: 'nexearch' },
			{ name: 'Image', value: 'image' },
			{ name: 'News', value: 'news' },
			{ name: 'Shopping', value: 'shop' },
			{ name: 'Video', value: 'video' },
			{ name: 'Web', value: 'web' },
		],
		default: 'nexearch',
		description: 'Which Naver search vertical to query',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
	{
		displayName: 'Maximum Results per Query',
		name: 'maxResultsPerQuery',
		type: 'number',
		default: 30,
		typeOptions: { minValue: 1 },
		description: 'How many results to return',
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
	},
];

const outputProperties: INodeProperties[] = [
	{
		displayName: 'Output',
		name: 'output',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['searchResult'], operation: ['search'] } },
		options: [
			{
				name: 'Raw',
				value: 'raw',
				description: 'Return every field the API produces for each result',
			},
			{
				name: 'Selected Fields',
				value: 'selected',
				description: 'Choose exactly which fields to return',
			},
			{
				name: 'Simplified',
				value: 'simplified',
				description: 'Return a compact set of the most useful result fields',
			},
		],
		default: 'simplified',
		description: 'How much data to return for each result',
	},
	{
		displayName: 'Fields to Include',
		name: 'fields',
		type: 'multiOptions',
		displayOptions: {
			show: { resource: ['searchResult'], operation: ['search'], output: ['selected'] },
		},
		options: [
			{ name: 'Displayed Link', value: 'displayed_link' },
			{ name: 'Fetched At', value: 'fetched_at' },
			{ name: 'Link', value: 'link' },
			{ name: 'Position', value: 'position' },
			{ name: 'Query', value: 'query' },
			{ name: 'Result Type', value: 'result_type' },
			{ name: 'Snippet', value: 'snippet' },
			{ name: 'Source', value: 'source' },
			{ name: 'Thumbnail', value: 'thumbnail' },
			{ name: 'Title', value: 'title' },
			{ name: 'Where', value: 'where' },
		],
		default: ['title', 'snippet', 'source', 'link'],
		description: 'Which fields to return when Output is set to Selected Fields',
	},
];

const authenticationProperties: INodeProperties[] = [
	{
		displayName: 'Authentication',
		name: 'authentication',
		type: 'options',
		options: [
			{
				name: 'API Key',
				value: 'apifyApi',
			},
			{
				name: 'OAuth2',
				value: 'apifyOAuth2Api',
			},
		],
		default: 'apifyApi',
		description: 'Choose which authentication method to use',
	},
];

export const properties: INodeProperties[] = [
	...resourceProperties,
	...actorProperties,
	...outputProperties,
	...authenticationProperties,
];
