<template>
  <div class="about">
    <div>
      <div id="content">
      </div>
    </div>
    <div>
      <input type="text" id="input">
      <button type="button" @click="say"><span>发送消息</span></button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
let socket
export default {
  mounted () {
    // 建立连接
    socket = io.connect('http://localhost:8090');
    // 监听 message 会话
    socket.on('message', function (data) {
      if (Object.keys(data)[0] === 'hello') {
        let html = document.createElement('p')
        html.innerHTML = `系统消息：<span>${data.hello}</span>`
        document.getElementById('content').appendChild(html)
      }
      console.log(data);
    });

    // 监听 news 会话
    socket.on('news', function (data) {
      console.log(data);
      let html = document.createElement('p')
      html.innerHTML = `小皮咖说：<span>我知道了，你说“${data.hello}”</span>`
      document.getElementById('content').appendChild(html)
    });
    // 监听吃饭会话
    socket.on('eating', function (data) {
      console.log(data);
      let html = document.createElement('p')
      html.innerHTML = `小皮咖说：${data.hello}`
      document.getElementById('content').appendChild(html)
    });
  },
  data () {
    return {

    }
  },
  methods: {
    // 按钮点击事件
    say () {
      let t = document.getElementById('input').value
      if (!t) return
      let html = document.createElement('p')
      html.innerHTML = `你细声说：<span>${t}</span>`
      document.getElementById('content').appendChild(html)
      socket.send('my other event');
      socket.emit('say', {
        my: t
      });
    },
    closeSocket () {
      socket.send('close server');
    }
  },
  beforeDestroy () {
    this.closeSocket()
  }
}
</script>

<style lang="less" scoped>
</style>