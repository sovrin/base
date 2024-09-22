import { Adapter } from './index.ts';

const closure: Adapter = <T>(): ContextAdapter<T> => {
    return async function adapter(): Promise<T> {
        const { req } = this;

        return new Promise((resolve, reject) => {
            const chunks: Buffer[] = [];

            if (!req.readable) {
                return reject(new Error('Stream is not readable'));
            }

            const onReadable = () => {
                const chunk = req.read() as Buffer;
                if (!chunk) {
                    return;
                }

                chunks.push(chunk);
            };

            const onEnd = () => {
                const buffer = Buffer.concat(chunks);

                return resolve(buffer as T);
            };

            req.on('readable', onReadable);
            req.on('end', onEnd);
            req.on('error', reject);
        });
    };
};

export default closure;
