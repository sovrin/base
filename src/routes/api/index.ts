import middleware from '#/middleware';
import { auth } from '#/services';

export default middleware(async function (next) {
    const { token } = await this.cookie<{ token: string }>();
    const { verify } = auth();

    try {
        await verify(token);
    } catch (e) {
        return next(e);
    }

    return next();
});
