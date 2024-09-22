enum Color {
    RESET = '\x1b[0m',
    BRIGHT = '\x1b[1m',
    DIM = '\x1b[2m',
    UNDERSCORE = '\x1b[4m',
    BLINK = '\x1b[5m',
    REVERSE = '\x1b[7m',
    HIDDEN = '\x1b[8m',
}

enum Foreground {
    BLACK = '\x1b[30m',
    RED = '\x1b[31m',
    GREEN = '\x1b[32m',
    YELLOW = '\x1b[33m',
    BLUE = '\x1b[34m',
    MAGENTA = '\x1b[35m',
    CYAN = '\x1b[36m',
    WHITE = '\x1b[37m',
    CRIMSON = '\x1b[38m',
}

enum Background {
    BLACK = '\x1b[40m',
    RED = '\x1b[41m',
    GREEN = '\x1b[42m',
    YELLOW = '\x1b[43m',
    BLUE = '\x1b[44m',
    MAGENTA = '\x1b[45m',
    CYAN = '\x1b[46m',
    WHITE = '\x1b[47m',
    CRIMSON = '\x1b[48m',
}

type ForegroundKeys = keyof typeof Foreground;
type BackgroundKeys = keyof typeof Background;

type Preset = {
    foreground?: ForegroundKeys;
    background?: BackgroundKeys;
};

const getColor = (
    input: string,
    pool: typeof Background | typeof Foreground,
) => {
    function getKey<T extends object>(enumObject: T, n: number): keyof T {
        const keys = Object.keys(enumObject);
        const index = n % keys.length;

        return keys[index] as keyof T;
    }

    const checksum = input
        .split('')
        .map((char) => char.codePointAt(0) || 0)
        .map((char, i) => char + i)
        .reduce((acc, n) => acc + n, 0);

    return getKey(pool, checksum);
};

export {
    Color,
    Foreground,
    Background,
    Preset,
    getColor,
    ForegroundKeys,
    BackgroundKeys,
};
