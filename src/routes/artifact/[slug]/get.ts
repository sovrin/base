import fs from 'node:fs';

import { getArtifactBySlug } from '#/models';
import route from '#/route';

export default route(async function () {
    const { slug } = await this.path<{ slug: string }>();
    const artifact = await getArtifactBySlug(slug);

    return fs.createReadStream(artifact.cursor);
});
