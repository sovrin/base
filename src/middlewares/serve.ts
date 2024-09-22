import { promises, createReadStream as stream } from 'node:fs';
import { resolve } from 'node:path';

const { stat } = promises;

const closure = (folder: string): Middleware => {
    const isStaticCall = (pathname: string) => {
        const [head] = pathname.split('/').filter(Boolean);

        return 'static' === head;
    };

    return async (req: Req, _res: Res, next: Next) => {
        const {
            url,
            headers: { host },
        } = req;
        let { pathname } = new URL(url, `https://${host}`);

        if (!isStaticCall(pathname)) {
            return next();
        } else {
            pathname = pathname.split('/').filter(Boolean).splice(1).join('/');
        }

        const filename = resolve(folder, pathname);
        try {
            const stats = await stat(filename);
            if (stats.isDirectory()) {
                return next();
            }

            const mtime = new Date(stats.mtimeMs).toUTCString();
            if (req.headers['if-modified-since'] === mtime) {
                return next();
            }

            return stream(filename);
        } catch (err) {
            return next(err);
        }
    };
};

export default closure;
