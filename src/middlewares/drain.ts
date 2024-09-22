const closure = (): Middleware => {
    return () => {
        return undefined;
    };
};

export default closure;
