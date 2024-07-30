export default {
	id: 'operation-generate-pdf',
	name: 'Generate PDF',
	icon: 'picture_as_pdf',
	description: 'Generate a pdf with flow data and the template.',
	overview: ({ collection, url }) => [
		{
			label: '$t:collection',
			text: collection,
		},
		{
			label: 'Url',
			text: url,
		},
	],
	options: [
		{
			field: 'text',
			name: 'Text',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'input',
			},
		},
	],
};
