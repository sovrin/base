import { AsyncLocalStorage } from 'node:async_hooks';

import conr, { Conr } from 'conr';

const storage = new AsyncLocalStorage<Conr>();

const set = (key: string, value: unknown) => {
    storage.getStore().set(key, value);
};

function get(): Conr;
function get<T>(key: string): T;
function get(key?: string): unknown {
    const store = storage.getStore();

    if (!key) {
        return store;
    }

    return store.get(key) as unknown;
}

const resolve = <T>(key: Resolve<T> | string, args?: unknown) => {
    if (typeof key === 'string') {
        return get().get(key) as unknown;
    }

    return get().resolve(key, args);
};

const run = <T>(props: object, fn: () => T): T => {
    const container = conr();
    for (const [key, value] of Object.entries(props)) {
        container.set(key, value);
    }

    return storage.run<T>(container, fn);
};

export { get, set, run, resolve };
