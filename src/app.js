export default {
    id: 'operation-pdf-builder',
    name: 'PDF Builder Operation',
    icon: 'picture_as_pdf',
    description: 'Generate a pdf with flow data and the template.',
    overview: ({filename, fonts}) => [
        {
            label: 'Filename',
            text: filename,
        },
        {
            label: 'Fonts',
            text: getFontList(fonts),
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
            name: '$t:fields.directus_files.filename_download',
            type: 'string',
            meta: {
                width: 'full',
                interface: 'input',
            }
        },
        {
            field: 'folder',
            name: '$t:folder',
            type: 'uuid',
            meta: {
                width: 'half',
                interface: 'system-folder',
            }
        },
        {
            field: 'storage',
            name: '$t:fields.directus_files.storage',
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
            name: '$t:template',
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
                interface: 'list',
                special: 'cast-json',
                options: {
                    template: '{{ font_family }} - {{ font_type }}',
                    fields: [
                        {
                            field: 'font_family',
                            name: 'Font Family',
                            type: 'string',
                            meta: {
                                width: 'full',
                                interface: 'input',
                                required: true,
                                options: {
                                    placeholder: 'Roboto',
                                    iconRight: 'type_specimen',
                                }
                            }
                        },
                        {
                            field: 'font_type',
                            name: 'Font Type',
                            type: 'string',
                            meta: {
                                width: 'full',
                                interface: 'select-dropdown',
                                required: true,
                                options: {
                                    allowOther: true,
                                    choices: [
                                        {text: 'Regular', value: 'Regular'},
                                        {text: 'Bold', value: 'Bold'},
                                        {text: 'Italic', value: 'Italic'},
                                        {text: 'BoldItalic', value: 'BoldItalic'},
                                    ]
                                }
                            }
                        },
                        {
                            field: 'url',
                            name: 'Url',
                            type: 'string',
                            meta: {
                                width: 'full',
                                interface: 'input',
                                required: true,
                                options: {
                                    placeholder: 'https://example.com/fonts/font.ttf',
                                    iconRight: 'link',
                                }
                            }
                        },
                    ]
                }
            }
        },
        {
            field: 'images',
            name: 'Images',
            type: 'json',
            meta: {
                width: 'full',
                interface: 'list',
                special: 'cast-json',
                options: {
                    template: '{{ image_name }}',
                    fields: [
                        {
                            field: 'image_name',
                            name: 'Name',
                            type: 'string',
                            meta: {
                                width: 'full',
                                interface: 'input',
                                required: true,
                                options: {
                                    placeholder: 'image',
                                    iconRight: 'image',
                                }
                            }
                        },
                        {
                            field: 'url',
                            name: 'Url',
                            type: 'string',
                            meta: {
                                width: 'full',
                                interface: 'input',
                                required: true,
                                options: {
                                    placeholder: 'https://example.com/image.jpg',
                                    iconRight: 'link',
                                }
                            }
                        },
                    ]
                }
            }
        }
    ],
};

function getFontList(fonts) {
    if (!Array.isArray(fonts)) {
        return '$t:no_items';
    } else {
        const uniqueFonts = fonts.reduce((acc, current) => {
            const font = acc.find(item => item.font_family === current.font_family);
            if (!font) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);

        return uniqueFonts.map(font => `${font.font_family} - ${font.font_type}`).join(uniqueFonts.length > 1 ? ', ' : '');
    }
}
