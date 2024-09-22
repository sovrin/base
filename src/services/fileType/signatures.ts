import { chain } from 'lodash';

import { Extension } from './extension';

const FILE_SIGNATURES = {
    [Extension.MP3]: [
        Uint8Array.from([0xff, 0xfb]),
        Uint8Array.from([0x49, 0x44, 0x33]),
    ],
    [Extension.WAV]: [
        Uint8Array.from([
            0x52,
            0x49,
            0x46,
            0x46,
            undefined,
            undefined,
            undefined,
            undefined,
            0x57,
            0x41,
            0x56,
            0x45,
        ]),
    ],
    [Extension.PNG]: [
        Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    ],
    [Extension.JPG]: [Uint8Array.from([0xff, 0xd8, 0xff])],
    [Extension.WEBP]: [
        Uint8Array.from([
            0x52,
            0x49,
            0x46,
            0x46,
            undefined,
            undefined,
            undefined,
            undefined,
            0x57,
            0x45,
            0x42,
            0x50,
        ]),
    ],
};

const MAX_BYTES = chain(FILE_SIGNATURES)
    .values()
    .flatMap()
    .map('length')
    .max()
    .value();

const getBytes = (type: Extension): number => {
    return chain(FILE_SIGNATURES[type]).map('length').max().value() as number;
};

export default FILE_SIGNATURES;
export { MAX_BYTES, getBytes };
