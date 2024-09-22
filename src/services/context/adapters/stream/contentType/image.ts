import { PassThrough } from 'node:stream';

import { Extension, Type } from '#/services/fileType';

type Args = {
    req: Req;
    contentType: string;
};

const closure = ({ req, contentType }: Args): Promise<Stream> => {
    return new Promise((resolve) => {
        const stream = new PassThrough();
        req.pipe(stream);

        const [type, extension] = contentType.split('/');

        return resolve({
            header: {
                type: type as Type,
                extension: extension as Extension,
                contentType,
            },
            stream,
        });
    });
};

export default closure;
