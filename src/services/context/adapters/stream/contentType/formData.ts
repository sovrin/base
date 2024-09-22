import { PassThrough } from 'node:stream';

import fdex, { getBoundary } from 'fdex';
import _ from 'lodash';

type Args = {
    req: Req;
    contentType: string;
};

const closure = ({ req, contentType }: Args): Promise<Stream> => {
    const parseHeader = (header: HeadersInit) => {
        const headers = new Headers(header);
        const contentDisposition = headers.get('Content-Disposition');
        if (!contentDisposition) {
            return null;
        }

        return _(contentDisposition.split(';'))
            .tail()
            .map((param) => param.split('='))
            .filter(([, value]) => value !== undefined)
            .map(([key, value]) => [
                key.trim(),
                value.trim().replace(/^"(.*)"$/, '$1'),
            ])
            .fromPairs()
            .value();
    };

    return new Promise((resolve, reject): Stream => {
        const boundary = getBoundary(contentType);
        if (!boundary) {
            reject(new Error('No boundary'));

            return;
        }

        const extractor = fdex(boundary, {
            limit: 10 * 1024 * 1024,
        });

        const stream = new PassThrough();
        const transform = req.pipe(extractor);

        const onData = ([head, body]: [HeadersInit, Buffer]) => {
            const header = parseHeader(head);
            stream.push(body);

            resolve({
                header,
                stream,
            });
        };

        const onEnd = () => {
            stream.push(null);
        };

        transform.on('data', onData).on('end', onEnd).on('error', reject);
    });
};

export default closure;
