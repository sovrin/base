import app from '#/app';
import { run } from '#/di';
import env from '#/env';

type Args = {
    version: string;
    root: string;
};

type base = (args: Args) => void;

const base: base = (args) => {
    void run(args, async () => {
        const config = await env();

        const instance = app({
            config,
            ...args,
        });

        for (const signal of ['SIGINT', 'SIGTERM', 'SIGQUIT']) {
            process.on(signal, () => {
                void instance.stop().then(() => {
                    process.exit(0);
                });
            });
        }

        void instance.start();
    });
};

export default base;
