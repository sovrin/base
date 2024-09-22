import { context } from '#/services';
import { resolve } from './di';

const closure = <T = DI>(fn: Resolve<T>) => {
    return (req: Req, res: Res, param: object) => {
        return resolve(fn, context(req, res, param));
    };
};

export default closure;
