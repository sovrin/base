import { PassThrough } from 'node:stream';

import { Extension, Type } from '#/services/fileType';

type Args = {
    req: Req;
};

const closure = ({ req }: Args): Promise<Stream> => {
    return new Promise((resolve) => {
        const stream = new PassThrough();
        req.pipe(stream);

        return resolve({
            header: {
                extension: Extension.UNKNOWN,
                type: Type.UNKNOWN,
            },
            stream,
        });
    });
};

export default closure;
