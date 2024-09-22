type Args = {
    req: Req;
    contentType: string;
};

const closure = ({ req, contentType }: Args): Promise<Stream> => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // todo
            // const parsedBody = new URLSearchParams(body);
            //
            // resolve({
            //     header: {
            //         type: type,
            //         extension: extension,
            //         contentType,
            //     },
            // });
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
};

export default closure;
