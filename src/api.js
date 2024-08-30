import pdfMake from 'pdfmake/build/pdfmake';
import {Readable} from 'stream';
import {Buffer} from 'buffer';
import {validate as uuidValidate} from 'uuid';
import * as pdfFonts from './vfs_fonts.js';

export default {
    id: 'operation-pdf-builder',
    handler: async ({filename, folder, storage, template, fonts}, {services, database, accountability, getSchema}) => {
        const {FilesService, AssetsService} = services;
        const schema = await getSchema({database});
        const filesService = new FilesService({
            schema: schema,
            accountability: accountability,
        });
        const assetsService = new AssetsService({
            knex: database,
            schema: schema,
        });
        let fileId = null;

        try {
            pdfMake.vfs = await getBase64Fonts(fonts, assetsService);
            pdfMake.fonts = getPdfMakeFonts(fonts);

            console.log('VFS:', pdfMake.vfs);
            console.log('Fonts:', pdfMake.fonts);

            const pdfDocGenerator = pdfMake.createPdf(template);

            const buffer = await new Promise((resolve, reject) => {
                pdfDocGenerator.getBuffer((buffer) => {
                    resolve(buffer);
                });
            });

            const pdfStream = bufferToReadable(buffer);
            const data = {
                title: filename,
                filename_download: `${filename}.pdf`,
                type: 'application/pdf',
                storage: 'local',
                folder: folder
            };

            try {
                fileId = await filesService.uploadOne(pdfStream, data);
            } catch (uploadError) {
                console.error('Error uploading PDF:', uploadError);
                return {
                    success: false,
                    message: "Error uploading PDF",
                    error: uploadError.message
                };
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
            return {
                success: false,
                message: "Error generating PDF",
                error: error.message
            };
        }

        return {
            success: true,
            message: "File generated successfully",
            data: {
                uuid: fileId
            }
        };
    },
};

function bufferToReadable(buffer) {
    const readable = new Readable();
    readable._read = () => {
    };
    readable.push(buffer);
    readable.push(null);
    return readable;
}

async function streamToBuffer(stream) {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
}

async function fetchExternalFont(url) {
    return await fetch(url, {headers: {responseType: 'arraybuffer'}}).then((response) => {
        return Buffer.from(response.data, 'binary').toString('base64');
    }).catch((error) => {
        console.error('Error fetching external font:', error);
        return false;
    });
}

async function fetchInternalFont(uuid, assetsService) {
    return assetsService.getAsset(uuid)
        .then(async (fileStream) => {
            const {stream} = fileStream;
            const buffer = await streamToBuffer(stream);
            return Buffer.from(buffer).toString('base64');
        })
        .catch((error) => {
            console.error('Error fetching internal font:', error);
            return false;
        });
}

async function getBase64Fonts(fonts, assetsService) {
    const base64Fonts = [];
    // Load the default pdfMake fonts
    for (const [font, base64] of Object.entries(pdfFonts.vfs)) {
        base64Fonts[font] = base64;
    }
    if (Array.isArray(fonts)) {
        for (const font of fonts) {
            try {
                const {font_family, font_type, url} = font;

                if (uuidValidate(url)) {
                    base64Fonts[`${font_family}-${font_type}.ttf`] = await fetchInternalFont(url, assetsService);
                } else if (url) {
                    base64Fonts[`${font_family}-${font_type}.ttf`] = await fetchExternalFont(url);
                }
            } catch (error) {
                console.error('Error fetching font:', error);
            }
        }
    }

    return base64Fonts;
}

function getPdfMakeFonts(fonts) {
    let fontList = {};

    try {
        if (Array.isArray(fonts)) {
            for (const font of fonts) {
                const {font_family} = font;
                fontList[font_family] = {
                    normal: `${font_family}-Regular.ttf`,
                    bold: `${font_family}-Bold.ttf`,
                    italics: `${font_family}-Italic.ttf`,
                    bolditalics: `${font_family}-BoldItalic.ttf`
                };
            }
        } else {
            fontList = {
                Roboto: {
                    normal: 'Roboto-Regular.ttf',
                    bold: 'Roboto-Bold.ttf',
                    italics: 'Roboto-Italic.ttf',
                    bolditalics: 'Roboto-BoldItalic.ttf'
                }
            };
        }
        return fontList;
    }catch (e) {
        console.error(e);
        return false;
    }
}
