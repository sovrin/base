import { Adapter } from './index';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter() {
        const { param } = this;

        return new Promise((resolve) => {
            return resolve(param as T);
        });
    };
};

export default closure;
