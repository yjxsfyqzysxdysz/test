// 使用 express 框架
var app = require('express')();
var server = require('http').Server(app);
// 引入 socket.io
var io = require('socket.io')(server);
// 监听 80 端口
server.listen(8090, () => {
  console.log('listen server 8090');
});
// io 各种事件
io.on('connection', function(socket) {
  console.log('websocket has connected');
  socket.emit('message', {
    hello: '欢迎链接'
  });
  socket.on('my other event', function(data) {
    console.log(data);
    socket.emit('message', {
      hello: '发送成功'
    });
  });
  socket.on('say', function(data) {
    console.log(data);
    if (data.my === '走，一起吃饭吧') {
      io.sockets.emit('eating', {
        hello: '果断走起呀！'
      });
      return;
    }
    io.sockets.emit('news', {
      hello: data.my
    });
  });
  socket.on('message', function(data) {
    if (data === 'close server') {
      socket.emit('message', {
        bye: '链接关闭'
      });
      setTimeout(() => socket.disconnect(true), 5000);
    }
    console.log(data);
  });
});
