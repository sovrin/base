import route from '#/route';

export default route(({ version }) => {
    const memory = {};
    const used = process.memoryUsage();
    for (const key in used) {
        memory[key] = `${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`;
    }

    return {
        version,
        status: 'up',
        uptime: process.uptime(),
        memory,
    };
});
