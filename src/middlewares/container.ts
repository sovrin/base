const closure = ({ set }: DI): Middleware => {
    return (req, res, next) => {
        set('req', req);
        set('res', res);

        return next();
    };
};

export default closure;
