import { Adapter } from '../index';

import contentType from './contentType';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter() {
        const { req, headers } = this;

        return new Promise((resolve) => {
            resolve(
                contentType({
                    headers,
                    req,
                }) as T,
            );
        });
    };
};

export default closure;
