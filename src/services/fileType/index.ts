import { chain, some } from 'lodash';
import { extname } from 'path';
import { Readable } from 'stream';

import { Extension } from './extension';
import FILE_SIGNATURES, { MAX_BYTES, getBytes } from './signatures';
import { ImageExtensions, Type, VideoExtensions } from './type';

const closure = () => {
    const compare = (signature: Uint8Array, actual: Uint8Array): boolean => {
        if (signature.length !== actual.length) {
            return false;
        }

        for (let i = 0, l = signature.length; i < l; i++) {
            if (
                signature[i] !== actual[i] &&
                typeof signature[i] !== 'undefined'
            ) {
                return false;
            }
        }

        return true;
    };

    const matches = (uint8: Uint8Array, extension: Extension): boolean => {
        return some(FILE_SIGNATURES[extension], (signature: Uint8Array) =>
            compare(signature, uint8.slice(0, signature.length)),
        );
    };

    const type = (input: string): Type => {
        let extension: Extension;

        if (input.includes('.')) {
            extension = extname(input) as Extension;
        } else {
            extension = input as Extension;
        }

        switch (true) {
            case ImageExtensions.includes(extension):
                return Type.IMAGE;
            case VideoExtensions.includes(extension):
                return Type.VIDEO;
            default:
                return null;
        }
    };

    const extension = (stream: Readable): Extension => {
        const buffer = new Uint8Array(MAX_BYTES);
        const red = stream.read(MAX_BYTES) as Buffer;

        buffer.set(red);

        return chain(FILE_SIGNATURES)
            .findKey((_signatures, extension: Extension) =>
                matches(buffer, extension),
            )
            .value() as Extension;
    };

    const verify = (stream: Readable, extension: Extension): boolean => {
        const bytesNeeded = getBytes(extension);
        const buffer = new Uint8Array(bytesNeeded);
        const red = stream.read(bytesNeeded) as Buffer;

        buffer.set(red);

        return matches(buffer, extension);
    };

    return {
        verify,
        extension,
        type,
    };
};

export default closure;
export { Type, Extension };
