import { createHash } from 'crypto';
import { createReadStream } from 'fs';

const hash = (path: string): Promise<string> => {
    return new Promise((resolve) => {
        const hash = createHash('md5');

        createReadStream(path)
            .on('data', (buffer) => hash.update(buffer))
            .on('end', () => resolve(hash.digest('hex')));
    });
};

export { hash };
