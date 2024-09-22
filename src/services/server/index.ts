import { Server, createServer } from 'node:http';

import logger from '#/services/logger';
import { Method, Status } from './const';
import { send } from './send';

type Closure = (route: Route) => {
    listen: (port: string | number) => Promise<Server>;
    close: () => Promise<void>;
};

const closure: Closure = (route) => {
    const log = logger('server');

    const listener = (req: Req, res: Res) => {
        const onResolve = (subject: string | Buffer | Stream) => {
            const { method } = req;
            let status = Status.OK;

            if (method === Method.GET) {
                if (!subject) {
                    status = Status.NOT_FOUND;
                }
            } else if (method === Method.POST || method === Method.PUT) {
                status = !subject ? Status.NO_CONTENT : Status.CREATED;
            }

            send(res, status, subject);
        };

        const onReject = (err: unknown): void => {
            console.error(err);

            send(res, Status.INTERNAL_SERVER_ERROR);
        };

        route(req, res).then(onResolve).catch(onReject);
    };

    const server: Server = createServer(listener);

    const listen = async (port: string | number): Promise<Server> =>
        new Promise((resolve) => {
            log(`listening on port ${port}`);

            return server.listen(port, () => {
                resolve(server);
            });
        });

    const close = async (): Promise<void> =>
        new Promise((resolve, reject) =>
            server.close((err) => {
                log('closing server');

                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }),
        );

    return {
        listen,
        close,
    };
};

export default closure;
