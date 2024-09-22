import { createArtifact } from '#/models/Artifact';
import route from '#/route';

export default route(async function () {
    const stream = await this.stream();

    try {
        const artifact = await createArtifact(stream);
        return {
            message: 'Artifact created',
            link: artifact.cursor,
        };
    } catch (error) {
        return {
            message: 'Failed to create artifact',
            error: (error as Error).message,
        };
    }
});
