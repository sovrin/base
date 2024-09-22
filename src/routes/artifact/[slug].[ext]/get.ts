import { getArtifactBySlug } from '#/models';
import route from '#/route';

export default route(async function () {
    const { slug, ext } = await this.path<{ slug: string; ext: string }>();
    const artifact = await getArtifactBySlug(slug);

    return {
        artifact,
        slug,
        ext,
    };
});
