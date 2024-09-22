import { findUserById } from '#/models';
import route from '#/route';

export default route(async function () {
    const { id } = await this.path<{ id: string }>();

    return findUserById(id);
});
