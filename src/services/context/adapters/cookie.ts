import { chain } from 'lodash';

import { Adapter } from './index';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter() {
        const { headers } = this;

        return new Promise((resolve) => {
            const cookie = headers.get('cookie');
            if (!cookie || cookie == '') {
                return resolve({} as T);
            }

            const cookies = chain(cookie)
                .split(';')
                .map((part: string) => part.trim())
                .map((part: string) => part.split('='))
                .reduce(
                    (acc, [left, right]) =>
                        Object.assign(acc, { [left]: right }),
                    {},
                )
                .value() as T;

            return resolve(cookies);
        });
    };
};

export default closure;
