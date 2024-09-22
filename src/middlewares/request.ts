import teda, { Format } from 'teda';

import { logger } from '#/services';

const closure = (): Middleware => {
    const log = logger('request');

    const skip = (req: Req) => {
        const { url } = req;

        return url === '/favicon.ico';
    };

    const adapter = (string: string) => {
        log(string, 'YELLOW');
    };

    return teda(Format.TINY, {
        skip,
        adapter,
    });
};

export default closure;
