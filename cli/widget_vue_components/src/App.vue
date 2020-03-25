<template>
  <div id="app">
    <previewPlugin ref="previewPlugin" :iconShow="iconShow"></previewPlugin>
  </div>
</template>

<script>
import previewPlugin from './components/previewPlugin.vue'

export default {
  name: 'App',
  components: {
    previewPlugin
  },
  data() {
    return {
      iconShow: {
        stopAll: true, // 关闭全部预览
        stop: true, // 关闭单个预览
        startStop: true, // 打开或者关闭预览按钮，用于单窗口
        screenshot: false, // 截图
        yuntai: false, // 云台
        niaokan: false, // 鸟瞰
        speech: false, // 对讲
        isRecording: false, // 录像
        volume: true, // 音量调节
        fullScreen: true, // 全屏
        multiScreen: true, // 画面分割
        streamChange: true, // 切换码流
        panePage: false, // 上一屏、下一屏
        panePageNum: false, // 当前屏页码
        tvWall: false, // 快速上墙
        toBack: false // 录像回放
      }
    }
  },
  methods: {
    openPreview() {
      const params = {
        cameraName: '20.44_视频通道_通道1',
        channel: 1,
        devIp: '192.168.20.44',
        devPort: 80,
        dport: 554,
        monitortype: 3,
        resId: '5dea182cb915d23760ca9a2f',
        streamType: 'main'
      }
      this.$nextTick(() => {
        this.$refs.previewPlugin.savePreviewInfo(params)
        this.$refs.previewPlugin.openPreview(params)
      })
    }
  }
}
</script>

<style lang="less">
@import "./assets/fonts/iconfont.css";
html {
  font-size: 16px;
}
body {
  font-size: 0.75rem;
}
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
