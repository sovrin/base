import * as crypto from 'node:crypto';

import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

const setUserRole = async (username: string, roles: string[]) => {
    const user = await findUserByUsername(username);
    if (!user) {
        return false;
    }

    const roleRecords = await prisma.role.findMany({
        where: {
            name: {
                in: roles,
            },
        },
    });

    return prisma.user.update({
        where: {
            username,
        },
        data: {
            roles: {
                set: roleRecords,
            },
        },
    });
};

const setUserPassword = async (username: string, password: string) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashed = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');

    return prisma.user.update({
        where: {
            username,
        },
        data: {
            password: hashed,
        },
    });
};

const findUserByUsername = async (username: string) => {
    return prisma.user.findUnique({
        where: {
            username,
        },
        include: {
            roles: true,
        },
    });
};

const findUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            roles: true,
        },
    });
};

const createUser = async ({
    username,
    email,
    password,
    roleIds,
}: {
    username: string;
    email: string;
    password: string;
    roleIds: Role['id'][];
}) => {
    return prisma.user.create({
        data: {
            email,
            username,
            password,
            roles: {
                connect: roleIds.map((id) => ({ id })),
            },
        },
    });
};

export {
    setUserRole,
    setUserPassword,
    findUserByUsername,
    findUserById,
    createUser,
};
