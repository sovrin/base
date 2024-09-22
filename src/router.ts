import { resolve } from 'node:path';

import fsbr from 'fsbr';

import * as di from '#/di';
import { container, drain, request, serve } from '#/middlewares';

const closure = (root: string) => {
    const { register, route, use } = fsbr({
        ext: '.ts',
        dev: true,
    });

    use(request());
    use(container(di));
    use(serve(root + '/storage/static'));

    const path = resolve(root, 'src/routes');
    register(path);

    use(drain());

    return route as Route;
};

export default closure;
