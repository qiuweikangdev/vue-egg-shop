module.exports = app => {
    class Controller extends app.Controller {
        async res() {
            this.ctx.socket.emit('chat', 'hi 我是服务端这是发送给你的消息');
            const params = this.ctx.args[0];
            // this.ctx.service.message.sendPeerMessage(params);
            console.log('接受客户端消息:', params);
        }

    }
    return Controller
};