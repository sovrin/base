import sevl from 'sevl';

const closure = () => {
    let config: Config;

    return async (): Promise<Config> => {
        if (!config) {
            config = await sevl<Config>();
        }

        return config;
    };
};

export default closure();
