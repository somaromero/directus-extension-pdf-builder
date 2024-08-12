export default {
    id: 'operation-pdf-generator',
    name: 'Generate PDF',
    icon: 'picture_as_pdf',
    description: 'Generate a pdf with flow data and the template.',
    overview: ({filename}) => [
        {
            label: 'Filename',
            text: filename,
        }
    ],
    options: [
        {
            field: 'permissions',
            name: '$t:permissions',
            type: 'string',
            schema: {
                default_value: '$trigger',
            },
            meta: {
                width: 'full',
                interface: 'select-dropdown',
                options: {
                    choices: [
                        {
                            text: 'From Trigger',
                            value: '$trigger',
                        },
                        {
                            text: 'Public Role',
                            value: '$public',
                        },
                        {
                            text: 'Full Access',
                            value: '$full',
                        },
                    ],
                    allowOther: true,
                },
            },
        },
        {
            field: 'filename',
            name: 'Filename',
            type: 'string',
            meta: {
                width: 'full',
                interface: 'input',
            }
        },
        {
            field: 'folder',
            name: 'Folder',
            type: 'uuid',
            meta: {
                width: 'half',
                interface: 'system-folder',
            }
        },
        {
            field: 'storage',
            name: 'Storage',
            type: 'string',
            meta: {
                width: 'half',
                interface: 'input',
                options: {
                    placeholder: 'local',
                    iconRight: 'storage',
                }
            }
        },
        {
            field: 'template',
            name: 'Template',
            type: 'json',
            meta: {
                width: 'full',
                interface: 'input-code',
                options: {
                    lineWrapping: true,
                    language: 'JSON',
                    template: JSON.stringify({"content": []}),
                }
            },
        },
        {
            field: 'fonts',
            name: 'Fonts',
            type: 'json',
            meta: {
                width: 'full',
                interface: 'input-code',
                options: {
                    lineWrapping: true,
                    language: 'JSON',
                    template: JSON.stringify({
                        "FontName-Regular.ttf": "",
                        "FontName-Italic.ttf": "",
                        "FontName-Bold.ttf": "",
                        "FontName-BoldItalic.ttf": "",
                    }),
                }
            }
        }
    ],
};
