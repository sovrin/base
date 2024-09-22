import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';

import { PrismaClient } from '@prisma/client';

import env from '#/env';
import { generator } from '#/services';

const prisma = new PrismaClient();

const generateUniqueSlug = async (): Promise<string> => {
    let slug: string;
    let exists: boolean;
    let attempts = 0;

    do {
        if (attempts >= 5) {
            throw new Error(
                'Failed to generate a unique slug after 5 attempts',
            );
        }

        slug = generator();
        exists =
            (await prisma.artifact.findFirst({
                where: { slug },
            })) !== null;
        attempts++;
    } while (exists);

    return slug;
};

const createArtifact = async (input: Stream) => {
    const { STORAGE_PATH } = await env();
    const { stream, header } = input;
    const { extension, type } = header;

    const slug = await generateUniqueSlug();
    const cursor = join(STORAGE_PATH, 'artifacts', slug);
    const path = join(process.cwd(), cursor);

    await promisify(pipeline)(stream, createWriteStream(path));

    return prisma.artifact.create({
        data: {
            type,
            extension,
            slug,
            cursor,
            owner: {
                connect: {
                    username: 'admin',
                },
            },
        },
    });
};

const getArtifactBySlug = async (slug: string) => {
    return prisma.artifact.findFirst({
        where: {
            slug,
        },
    });
};

export { createArtifact, getArtifactBySlug };
