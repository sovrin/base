import { Server } from 'http';

import router from '#/router';
import { server } from '#/services';
import log from '#/services/logger';

type Args = {
    config: Config;
    version: string;
    root: string;
};

type App = (args: Args) => {
    start: () => Promise<Server>;
    stop: () => Promise<void>;
};

const App: App = ({ config, version, root }) => {
    log('app')(` ${version}`, 'BLUE');

    const { PORT } = config;
    const route = router(root);
    const instance = server(route);

    const start = async () => {
        return instance.listen(PORT);
    };

    const stop = async () => {
        return instance.close();
    };

    return {
        start,
        stop,
    };
};

export default App;
