import random from './random';

enum Mode {
    RANDOM = 'RANDOM',
}

const closure = (length = 8, mode: Mode = Mode.RANDOM): string => {
    switch (mode) {
        case Mode.RANDOM:
            return random(length);
        default:
            throw new Error('Invalid mode');
    }
};

export default closure;
