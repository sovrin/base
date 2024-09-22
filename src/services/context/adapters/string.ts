import { Adapter } from './index';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter() {
        const buffer = await this.buffer();

        return buffer.toString() as T;
    };
};

export default closure;
