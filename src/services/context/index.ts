import { chain, forEach } from 'lodash';

import adapters, { Adapter, Keys } from './adapters';

const closure = (req: Req, res: Res, param: object = {}) => {
    const headers = new Headers();
    const loaded: Partial<Record<Keys, Adapter>> = {};

    forEach(req.headers, (value: string, key: string) => {
        headers.append(key, value);
    });

    const context = {
        param,
        req,
        res,
        headers,
    };

    const lazyLoad = (input: Record<Keys, Adapter>) => {
        return chain(input)
            .mapValues((_, key: Keys) => () => load(key))
            .value();
    };

    const load = (key: Keys): unknown => {
        if (loaded[key]) {
            return loaded[key]();
        }

        const adapter = adapters[key];

        loaded[key] = adapter().bind({
            ...context,
            ...lazyLoad(adapters),
        }) as Adapter;

        return loaded[key]();
    };

    return lazyLoad(adapters);
};

export default closure;
