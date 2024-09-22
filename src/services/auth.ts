import type { Payload } from 'jted';
import { decode, encode } from 'jted';

import env from '#/env';

const closure = () => {
    const verify = async (token: string, validate = true) => {
        const { SALT } = await env();

        return decode(token, SALT, 'sha512', validate);
    };

    const sign = async (payload: Payload) => {
        const { SALT } = await env();

        return encode(
            {
                ...payload,
                exp: 1000 * 60 * 24, // 24h
            },
            SALT,
            'sha512',
        );
    };

    return {
        verify,
        sign,
    };
};

export default closure;
