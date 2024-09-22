import {
    Middleware as BaseMiddleware,
    Next as BaseNext,
    Request as BaseRequest,
    Response as BaseResponse,
} from 'fsbr';
import { Readable } from 'stream';

import { Extension, Type } from './services/fileType';

type Platform = {
    version: string;
};

declare global {
    type DI = {
        set: (key: string, value: unknown) => void;
        get: <T>(key: string) => T;
        resolve: <T>(key: Resolve<T> | string, args?: unknown) => unknown;
        run: <T>(props: object, fn: () => T) => T;
    };

    type Container = {
        context: Context;
        req: Req;
        res: Res;
    } & Platform;

    type Config = {
        PORT: string;
        SALT: string;
        MONGODB_DSN: string;
        STORAGE_PATH: string;
    };

    type ContextAdapter<T> = (
        this: Context & {
            req: Req;
            res: Res;
            headers: Headers;
            param?: object;
        },
    ) => Promise<T>;

    type Stream = {
        header: {
            type?: Type;
            filename?: string;
            extension?: Extension;
            contentType?: string;
        };
        stream?: Readable;
    };

    type Context = {
        json<T extends object>(): Promise<T>;
        buffer(): Promise<Buffer>;
        string(): Promise<string>;
        query<T extends object>(): Promise<T>;
        path<T>(): Promise<T>;
        cookie<T extends object>(): Promise<T>;
        stream(): Promise<Stream>;
    };

    type Resolve<T> = (this: Context, obj: Container & T) => unknown;

    type Res = BaseResponse;

    type Req = BaseRequest;

    type Next = BaseNext;

    type Middleware = BaseMiddleware;

    type Route = (req: Req, res: Res) => Promise<unknown>;

    export {
        Config,
        Container,
        Context,
        ContextAdapter,
        DI,
        Middleware,
        Next,
        Req,
        Res,
        Resolve,
        Route,
        Stream,
    };
}
