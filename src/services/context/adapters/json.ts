import { Adapter } from './index';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter() {
        const buffer = await this.buffer();

        return new Promise((resolve) => {
            const string = buffer.toString();
            const json = JSON.parse(string) as unknown as T;

            return resolve(json);
        });
    };
};

export default closure;
