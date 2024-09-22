function closure() {
    const cache = new Map<string, { value: unknown; timestamp: number }>();
    const TIMEOUT = 5000;

    const cleanup = (currentTime: number) => {
        for (const [key, { timestamp }] of cache.entries()) {
            if (currentTime - timestamp >= TIMEOUT) {
                cache.delete(key);
            }
        }
    };

    return (key: string, fn: () => unknown) => {
        return async () => {
            const currentTime = Date.now();

            cleanup(currentTime);

            if (cache.has(key)) {
                const cachedItem = cache.get(key);
                if (currentTime - cachedItem.timestamp < TIMEOUT) {
                    return cachedItem.value;
                } else {
                    cache.delete(key);
                }
            }

            const value = await fn();
            cache.set(key, { value, timestamp: currentTime });

            return value;
        };
    };
}

export default closure;
