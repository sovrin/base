import { context } from '#/services';

type Resolve = (this: Context, next: Next) => Promise<unknown>;

const closure = (fn: Resolve) => {
    return (req: Req, res: Res, next: Next) => {
        return fn.apply(context(req, res), [next]) as unknown;
    };
};

export default closure;
