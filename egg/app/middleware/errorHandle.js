/**
 * @description: 统一错误处理
 * @code  401 未授权 500:服务器内部错误  422 :状态码是指请求格式正确，但是由于含有语义错误，无法响应。
 * @return: 
 */

module.exports = (options, app) => {
    return async function(ctx, next) {
        try {
            await next()
        } catch (err) {
            // 所有的异常都在 app 上触发一个 error 事件，egg会记录一条错误日志
            ctx.app.emit('error', err, ctx);
            const status = err.status || 500;
            // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
            const error = status === 500 && ctx.app.config.env === 'prod' ?
                'Internal Server Error' :
                err.message;
            if (status === 422) {
                //422:请求格式正确，但是由于含有语义错误
                // 从 error 对象上读出各个属性，设置到响应中 
                ctx.body.detail = err.errors;
            } 
             ctx.status =status

        }


    }
}