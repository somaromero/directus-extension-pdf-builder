import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from './vfs_fonts';
import {Readable} from 'stream';

pdfMake.vfs = pdfFonts.vfs;

export default {
    id: 'operation-pdf-generator',
    handler: async ({filename, folder, storage, template, fonts}, {services, database, accountability, getSchema}) => {
        const {FilesService} = services;
        const schema = await getSchema({database});
        const filesService = new FilesService({
            schema: schema,
            accountability: accountability,
        });
        let fileId = null;

        try {
            pdfMake.vfs = fonts;
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
