const CHAR_SET =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const closure = (length = 5) => {
    return Array.from({ length })
        .map(Math.random)
        .map((n) => ~~(n * 100))
        .map((n) => CHAR_SET[n % CHAR_SET.length])
        .join('');
};

export default closure;
