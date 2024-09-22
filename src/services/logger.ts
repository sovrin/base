import {
    Background,
    type BackgroundKeys,
    Color,
    Foreground,
    type ForegroundKeys,
    type Preset,
    getColor,
} from '#/utils/colors';

type Log = (
    namespace: string,
    preset?: Preset,
) => (
    message: string,
    foreground?: ForegroundKeys,
    background?: BackgroundKeys,
) => void;

const closure: Log = (namespace: string, preset?: Preset) => {
    const print = console.info.bind(console) as Console['info'];

    return (
        message: string,
        foreground?: ForegroundKeys,
        background?: BackgroundKeys,
    ) => {
        foreground =
            foreground || preset?.foreground || getColor(namespace, Foreground);
        background = background || preset?.background || 'BLACK';

        const badge = `> ${namespace}`;
        const { length } = badge;
        const space = ' '.repeat(length + 2);
        const line = message.split('\n').join(`\n${space}↪ `);

        print(
            Foreground[foreground],
            Background[background],
            badge,
            Color.RESET,
            line,
        );
    };
};

export default closure;
