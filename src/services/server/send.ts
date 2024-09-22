import { ReadStream, statSync } from 'node:fs';
import { ServerResponse } from 'node:http';

import { ContentType, Status } from './const';

export const send = (
    res: ServerResponse,
    statusCode: Status,
    data: string | Buffer | Stream = null,
): void => {
    if (res.headersSent) {
        res.end();

        return;
    }

    let type = ContentType.STREAM;
    let length = 0;

    if (data == null) {
        //
    } else if (data.constructor === String) {
        if (data.trim().startsWith('<svg')) {
            type = ContentType.SVG;
        } else if (RegExp(/^<!DOCTYPE html>/i).exec(data.trim())) {
            type = ContentType.HTML;
        }

        length = data.length;
    } else if (data instanceof Buffer) {
        type = ContentType.STREAM;
        length = data.length;
    } else if (data instanceof ReadStream) {
        const { size } = statSync(data.path);

        type = ContentType.STREAM;
        length = size;
    } else if (data.constructor !== String) {
        data = JSON.stringify(data, null, 2);

        type = ContentType.JSON;
        length = Buffer.byteLength(data);
    }

    res.statusCode = statusCode;
    res.setHeader('Content-Type', type);
    res.setHeader('Content-Length', length);

    if (data instanceof ReadStream) {
        data.pipe(res);
    } else {
        res.end(data);
    }
};
