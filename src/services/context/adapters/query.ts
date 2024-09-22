import { parse } from 'node:url';

import { Adapter } from './index';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter() {
        const { req } = this;

        return new Promise((resolve) => {
            const { query } = parse(req.url, true);

            resolve((query || {}) as T);
        });
    };
};

export default closure;
