export default {
	id: 'operation-pdf-generator',
	name: 'Generate PDF',
	icon: 'picture_as_pdf',
	description: 'Generate a pdf with flow data and the template.',
	options: [
		{
			field: 'template',
			name: 'Template',
			type: 'string',
			meta: {
				width: 'full',
				interface: 'input-code',
			},
		},

	],
};
