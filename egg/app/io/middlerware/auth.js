module.exports = app => {
    return async(ctx, next) => {
        console.log('connected')
        ctx.socket.emit('res', 'connected!');
        await next();

        // execute when disconnect.
        console.log('disconnection!');
    };
};