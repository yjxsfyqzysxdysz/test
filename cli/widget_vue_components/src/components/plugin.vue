<template>
  <div class="single-most-outer" @click.stop="clickEvent(null,1)" @dblclick="clickEvent(null,2)">
    <div class="single-outer">
      <!-- 插件 -->
      <div class="plugin-video" :class="{'small-button': paneMark!==0 && defaultPane===5 && !isMaximize, 'top': appendTopButtons.toggle}" :style="singleStatus.isSyncPlay ? 'position: fixed;top: -9999px;': ''" v-if="singleStatus.isPlugin&&singleStatus.playStatus">
        <object ref="object" type="application/x-webplayercontrol"></object>
        <iframe v-if="singleStatus.isPlay && (singleStatus.isButton && (pluginIconShow.showBottomIcon || singleStatus.fullScreen) || appendTopButtons.toggle)"></iframe>
        <div class="plugin-button" v-if="(singleStatus.isButton && singleStatus.isPlay) || singleStatus.fullScreen" @dblclick.stop>
          <div class="plugin-button-box">
            <i class="icon iconfont icon-hidemenu-copy-copy" title="隐藏" @click.stop="toolbarShow" v-if="pluginIconShow.hidemenuIcon || singleStatus.fullScreen"></i>
            <div class="div-null"></div>
            <div class="dp-con" @mouseenter="showVideotape = true" @mouseleave="showVideotape = false" v-if="pluginIconShow.isRecordingIcon || singleStatus.fullScreen">
              <i class="icon iconfont icon-recplayback" :class="{'disable': !singleStatus.isPlay}" title="录像" ></i>
              <ul v-show="showVideotape && singleStatus.isPlay">
                <li v-for="(item, i) in videotapeList" @click="openRecording(item)" :key="i">{{item.label}}</li>
                <i></i>
              </ul>
            </div>
            <div class="dp-con" @mouseenter="showSetStream=true" @mouseleave="showSetStream=false" v-if="pluginIconShow.streamChangeIcon || singleStatus.fullScreen">
              <ul v-show="showSetStream && singleStatus.isPlay">
                <li v-for="mode in streamArr" :key='mode.value' @click="changeStream(mode.value)" :class="{active: mode.value===(singleStatus.source && singleStatus.source.streamType)}">{{mode.label}}</li>
                <i></i>
              </ul>
              <i class="icon iconfont icon-stream-set" :class="{'disable': !singleStatus.isPlay}" title="码流切换"></i>
            </div>
            <i class="icon iconfont icon-preview-stop" title="关闭预览" @click="quickStop()" v-if="pluginIconShow.previewStopIcon || singleStatus.fullScreen"></i>
            <i class="icon iconfont" :class="[singleStatus.showVolume&&singleStatus.isPlay? 'icon-volume': 'icon-mute']" title="开启伴音" @click="changeSound()" v-if="pluginIconShow.muteIcon || singleStatus.fullScreen"></i>
            <i class="icon iconfont icon-screenshot" :class="{'disable': !singleStatus.isPlay}" title="截图" @click="getCapture" v-if="pluginIconShow.screenshot || singleStatus.fullScreen"></i>
            <i class="icon iconfont icon-yuntai" :class="{disable: !(singleStatus.source.monitortype >= 2)}" title="云台" @click="PTZClick()" v-if="pluginIconShow.yuntaiIcon || singleStatus.fullScreen"></i>
            <i class="icon iconfont" :class="[singleStatus.isSpeech? 'icon-shipinlei-duijiang': 'icon-shipinleiduijiangjinyong', !singleStatus.isPlay? 'disable': '']" :title="[singleStatus.isSpeech?'关闭对讲':'对讲']" @click="clickSpeech()" v-if="pluginIconShow.speechIcon || singleStatus.fullScreen"></i>
            <i class="icon iconfont" :class="[singleStatus.isBoost? 'icon-nk-close' : 'icon-niaokan']" :title="[singleStatus.isBoost?'关闭鸟瞰':'开启鸟瞰']" @click="boost()" v-if="pluginIconShow.niaokanIcon || singleStatus.fullScreen"></i>
            <i class="icon iconfont icon-tv-wall" title="快速上墙" @click="toWallBtn()" v-if="pluginIconShow.tvwallIcon || singleStatus.fullScreen"></i>
            <i class="icon iconfont" :class="[singleStatus.fullScreen&&singleStatus.isPlay? 'icon-exit-full-screen': 'icon-quanpingfangda']" :title="[singleStatus.fullScreen?'退出全屏':'全屏']" @click="fullScreen" v-if="pluginIconShow.quanpingfangdaIcon || singleStatus.fullScreen"></i>
          </div>
        </div>
        <!-- 上方的按钮条 -->
        <div class="plugin-button top" v-if="appendTopButtons.toggle && singleStatus.isPlay" @dblclick.stop>
          <div class="plugin-button-box">
            <i class="iconfont icon-pingtaihulian" title="窗口切换" @click.stop="changeScreen" v-if="appendTopButtons.buttons.includes('change')"></i>
          </div>
        </div>
      </div>
      <!-- 视频遮盖 -->
      <div class="sync-play-shade" v-if="singleStatus.isSyncPlay && !singleStatus.img"></div>
      <img class="sync-play-img" v-if="singleStatus.isSyncPlay && singleStatus.img" :src="singleStatus.img" >
      <div class="sync-play-shade" v-if="singleStatus.isSyncPlay && singleStatus.isMiddlePlay"><span @click="$emit('middlePlay', paneMark)" class="icon iconfont icon-play"></span></div>
      <!-- h5 -->
      <div class="label-video" ref="rtmpvideo" v-show="!singleStatus.isPlugin&&singleStatus.playStatus">
      </div>
    </div>
    <div v-show="(showPTZ&&singleStatus.isPlay)" class="PTZbuttonBars" @mouseup.stop="controlDome(item.addess,0)" @mousedown.stop="controlDome(item.addess)" v-for="(item, i) in xy" :key="i" :style="{left: item.x, top: item.y}">
      <bs-cover v-model="showPTZ" class="buttonBar-box" :style="{transform: `rotate(${item.angle}deg)`, textAlign: 'center'}">
        <img :src="item.img" :title="item.addess"/>
      </bs-cover>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { access_token } from '@assets/js/stored.js' // eslint-disable-line

export default {
  props: {
    singleStatus: {
      type: Object,
      default: () => {
        return {
          isPlugin: true, // 插件播放还是h5
          playStatus: false, // 画面是否在使用
          isButton: false, // 是否显示插件悬浮条
          isPlay: false, // 是否播放
          img: '' // 图片遮盖的base64
        }
      }
    },
    appendTopButtons: { // 视频窗口上方的按钮
      type: Object,
      default: () => {
        return {
          toggle: false, // 是否显示
          buttons: [] // 显示那些按钮 change
        }
      }
    },
    paneMark: {
      // 当前窗格号
      type: Number,
      default: 0
    },
    defaultPane: {
      // 默认显示窗格数量
      type: Number,
      default: 4
    },
    isMaximize: {
      // 单画面(双击)
      type: Boolean,
      default: false
    },
    pluginIconShow: {
      // 单个插件内图标是否显示
      type: Object,
      default: () => {
        return {
          showBottomIcon: true, // 图标按钮条
          hidemenuIcon: true, // 隐藏
          previewStopIcon: true, // 关闭预览
          isRecordingIcon: true, // 录像类型
          streamChangeIcon: true, // 码流切换
          screenshot: true, // 截图
          muteIcon: true, // 开启伴音
          yuntaiIcon: true, // 云台
          speechIcon: true, // 对讲
          niaokanIcon: true, // 开启鸟瞰
          tvwallIcon: true, // 快速上墙
          quanpingfangdaIcon: true // 全屏
        }
      }
    }
  },
  data() {
    return {
      player: null,
      xy: [
        { x: '50%', y: '20%', angle: '0', addess: 'tiltUp', img: '/static/yuntai/bottom1.png' },
        { x: '50%', y: '70%', angle: '180', addess: 'tiltDown', img: '/static/yuntai/bottom1.png' },
        { x: '25%', y: '45%', angle: '-90', addess: 'panLeft', img: '/static/yuntai/bottom1.png' },
        { x: '75%', y: '45%', angle: '90', addess: 'panRight', img: '/static/yuntai/bottom1.png' },
        { x: '32%', y: '28.5%', angle: '-90', addess: 'swayUpLeft', img: '/static/yuntai/bottom2.png' },
        { x: '32%', y: '63.5%', angle: '-180', addess: 'swayDownLeft', img: '/static/yuntai/bottom2.png' },
        { x: '67%', y: '28.5%', angle: '0', addess: 'swayUpRight', img: '/static/yuntai/bottom2.png' },
        { x: '67%', y: '63.5%', angle: '90', addess: 'swayDownRight', img: '/static/yuntai/bottom2.png' }
      ],
      showPTZ: false, // 窗口内显示云台
      tOpen: '', // 预览断线重连开流定时器（仅在插件模式)
      showVideotape: false, // 鼠标移入显示录像类型
      showSetStream: false, // 鼠标移入显示码流切换
      streamArr: [
        { value: 'main', label: '主码流' },
        { value: 'sub1', label: '子码流' }
      ],
      recordpath: '' // 本地录像存放路径
    }
  },
  computed: {
    videotapeList() {
      return [
        { value: '本地录像', label: this.localPlayer },
        { value: '中心录像', label: this.centrePlayer }
      ]
    },
    localPlayer() {
      return this.singleStatus.isRecording ? '关闭本地录像' : '本地录像'
    },
    centrePlayer() {
      return this.singleStatus.isCentreRecording ? '关闭中心录像' : '中心录像'
    }
  },
  mounted() {
    this.$nextTick(function() {
      setTimeout(() => {
        if (this.$refs.object) {
          this.$refs.object.SetMouseStatusCallback(this.clickEvent)
          this.$refs.object.SetKeyboardCallback(this.pluginEscCall)
          this.$refs.object.SetNotifyCallback(this.notifyCallback)
        }
      }, 100)
    })
  },
  watch: {
    'singleStatus.playStatus': {
      handler(val) {
        if (val) {
          this.$nextTick(() => {
            if (this.$refs.object) {
              this.$refs.object.SetMouseStatusCallback(this.clickEvent)
              this.$refs.object.SetKeyboardCallback(this.pluginEscCall)
              this.$refs.object.SetNotifyCallback(this.notifyCallback)
            }
          })
        } else {
          this.$nextTick(() => {
            if (this.$refs.object) {
              this.$refs.object.SetMouseStatusCallback(null)
              this.$refs.object.SetKeyboardCallback(null)
              this.$refs.object.SetNotifyCallback(null)
            }
          })
        }
      },
      deep: true
    }
  },
  methods: {
    // 返回参数 index：插件窗格号 clicktype：单机还是双击
    clickEvent(index, clickType) {
      this.$emit('updateStatus', this.paneMark, { isButton: this.singleStatus.isPlay }, 'isButton')
      this.$emit('clickEvent', index, clickType, this.paneMark)
    },
    openRtmp(rtmp) {
      this.$refs.rtmpvideo.innerHTML = `<video ref="video" style="width:100%;height:100%" id="player${
        this.paneMark
      }" class="video-js"><source src="${rtmp}" type="rtmp/flv"></video>`
      let options = {
        autoplay: true,
        controls: true,
        muted: true,
        controlBar: {
          // 配置控制栏
          timeDivider: false, // 时间分割线
          durationDisplay: false, // 总时间
          progressControl: false, // 进度条
          // customControlSpacer: true, // 未知
          fullscreenToggle: true // 全屏
        },
        techOrder: ['flash'],
        flash: {
          swf: `http://${window.location.host}/static/plugin/video-js.swf`
        }
      }
      if (this.player) {
        this.stopRtmp()
      }
      this.$nextTick(() => {
        this.player = videojs(document.querySelector(`#player${this.paneMark}`), options, function() {})
        this.player.on('pause', () => {
          // 暂停事件
          this.clickEvent(null, 1)
          this.$emit('updateStatus', this.paneMark, { isPlay: false })
        })
        this.player.on('play', () => {
          this.clickEvent(null, 1)
          this.$emit('updateStatus', this.paneMark, { isPlay: true })
        })
        this.player.on('volumechange', () => {
          this.volumechange()
        })
        this.$emit('updateStatus', this.paneMark, { isPlay: true, isPlugin: false, playStatus: true, isButton: false })
      })
      this.$emit('updateStatus', this.paneMark, { isPlay: true }) // $nextTick 是异步 先改成播放状态
    },
    stopRtmp() {
      if (this.singleStatus.isPlay || this.singleStatus.playStatus) {
        this.player && this.player.dispose()
        this.$emit('updateStatus', this.paneMark, { isPlay: false, playStatus: false, source: '' })
      }
    },
    toolbarShow() {
      this.$emit('updateStatus', this.paneMark, { isButton: false })
    },
    changeStream(val) {
      this.$parent.changeStream(val)
    },
    openRecording(val) {
      this.$parent.openRecording(val)
    },
    clickRecord() { // 本地录像
    },
    openCentreRecord() {
      if (!this.singleStatus.isPlay || !this.singleStatus.source) {
        return
      }
      this.$http.get('/playback/ds?resId=' + this.singleStatus.source.resId).then(res => {
        if (res && res.data.server) {
          const obj = {
            devIp: this.singleStatus.source.devIp,
            devPort: this.singleStatus.source.devPort,
            channel: this.singleStatus.source.channel,
            streamType: this.singleStatus.source.streamType,
            mType: this.singleStatus.source.vendor || '',
            eventType: 512,
            eventSrc: 0,
            dsServerId: res.data.server
          }
        } else {
          this.$Notice.warning({ desc: 'ds服务器不存在', title: '提示' })
        }
      }).catch(err => {
        console.log(err)
        this.$Notice.error({ desc: '服务器出错', title: '提示' })
      })
    },
    getCapture() { // 截图
    },
    volumechange() { // video标签改变音量
      if (this.player.volume() === 0) {
        this.$emit('updateStatus', this.paneMark, { volumeValue: 50, showVolume: false })
      } else {
        this.$emit('updateStatus', this.paneMark, { volumeValue: this.player.volume() * 100, showVolume: true })
      }
    },
    quickStop() {
      let obj = { isPlay: false, playStatus: false, isBoost: false, source: '' }
      if (!this.singleStatus.isPlugin) {
        // rtmp 停止
        this.stopRtmp()
      } else {
        if (this.singleStatus.isPlay) {
          this.clearTOpen()
          this.$refs.object.CloseRealStream()
          this.showPTZ = false
        }
      }
      let elementSource = JSON.parse(JSON.stringify(this.singleStatus.source))
      if (elementSource) {
        this.$parent.$emit('stopBack', elementSource)
      }
      this.$emit('updateStatus', this.paneMark, obj)
    },
    notifyCallback() { // 预览断线回调
      let inParam = JSON.parse(JSON.stringify(this.singleStatus.source))
      this.$parent.stopPreview(this.paneMark)
      this.timerOpen(inParam)
    },
    timerOpen(inParam) { // 断线后定时重新开流
      this.tOpen = setInterval(() => {
        this.$parent.openIndexPreview(inParam, this.paneMark)
      }, 10000)
    },
    clearTOpen() { // 清除断线重新开流定时器
      clearInterval(this.tOpen)
      this.tOpen = null
    },
    boost() { // 鸟瞰
      if (!this.singleStatus.isPlay) {
        return
      }
      this.$refs.object.SetPlayLocalBoost()
      this.$emit('updateStatus', this.paneMark, { isBoost: !this.singleStatus.isBoost })
    },
    fullScreen() { // 全屏
      if (!this.singleStatus.isPlay) {
        return
      }
      if (this.singleStatus.isPlugin) {
        this.$parent.fullScreen()
        // if (!this.singleStatus.fullScreen) {
        //   this.$refs.object.SetPlayFullScreen()
        // } else {
        //   this.$refs.object.SetPlayNormalScreen()
        // }
      } else {
        this.playFullscreen()
      }
    },
    playFullscreen() { // h5全屏
      this.player.requestFullscreen()
      this.$emit('updateStatus', this.paneMark, { fullScreen: !this.singleStatus.fullScreen })
    },
    toWallBtn() { // 上墙
      this.$parent.toWallBtn()
    },
    PTZClick() { // 云台开关
      if (!(this.singleStatus.source.monitortype >= 2)) {
        return
      }
      this.showPTZ = !this.showPTZ
    },
    controlDome(ctrlCmdEnum, speed = 3, presetIndex = 1, route = 1, stopTime = 5, opt = 1, channel = 1) { // 云台点击事件
    },
    pluginEscCall(index, type, keyCode) { // 监听键盘Esc
      if (this.singleStatus.fullScreen && +keyCode === 27) {
        // this.exitFullScreen()
      }
      this.$emit('pluginEscCall', index, type, keyCode)
    },
    exitFullScreen() { // 退出全屏
      if (this.singleStatus.isPlugin) {
        this.$refs.object.SetPlayNormalScreen()
      } else {
        this.player.requestFullscreen()
      }
      this.$emit('updateStatus', this.paneMark, { fullScreen: false })
    },
    clickSpeech() { // 点击对讲
      if (!this.singleStatus.isPlay) {
        return
      }
      this.$parent.clickSpeech()
    },
    startSpeech() { // 插件开始对讲
      this.$refs.object.StartSpeech(false)
    },
    stopSpeech() { // 插件暂停对讲
      this.$refs.object.StopSpeech()
    },
    closeSpeech() { // 插件关闭对讲
      if (this.singleStatus.isSpeech && !this.$refs.object.CloseSpeech()) {
        this.$emit('updateStatus', this.paneMark, { isSpeech: false })
      }
    },
    changeSound() { // 音量开关
      if (!this.singleStatus.isPlay) {
        return
      }
      if (this.singleStatus.showVolume) {
        this.closeSound()
      } else {
        this.openSound()
        this.setSoundValue(50)
      }
    },
    openSound() { // 打开伴音
      if (this.singleStatus.isPlugin) {
        this.$refs.object.OpenPlayerSound()
      } else {
        this.player.muted(false)
      }
      this.$emit('updateStatus', this.paneMark, { showVolume: true })
    },
    closeSound() { // 关闭伴音
      if (this.singleStatus.isPlugin) {
        this.$refs.object.StopPlayerSound()
      } else {
        this.player.muted(true)
      }
      this.$emit('updateStatus', this.paneMark, { showVolume: false, volumeValue: 50 })
    },
    setSoundValue(value) { // 设置伴音大小
      if (this.singleStatus.isPlugin) {
        this.$refs.object.SetPlayerVolume(value)
      } else {
        this.player.volume(value / 100)
      }
      this.$emit('updateStatus', this.paneMark, { volumeValue: value })
    },
    getSoundValue() { // 获取伴音大小
      if (!this.singleStatus.isPlay) {
        return
      }
      if (this.singleStatus.isPlugin) {
        return JSON.parse(this.$refs.object.GetPlayerVolume())
      } else {
        return { Volume: this.player.volume() * 100, success: true }
      }
    },
    setStreamPlayerToolStringEx(strTools, bShowStream) { // 设置码流提示字符串
      // strTools:需要追加的提示字符串
      // bShowStream:是否显示码流信息
      if (!this.singleStatus.isPlay) {
        return
      }
      return this.$refs.object.SetStreamPlayerToolStringEx(strTools, bShowStream)
    },
    getCoverPic() { // 视频截图
      return new Promise(resolve => {
        let src = ''
        let i = 5
        while (i-- && !src) {
          src = this.$refs.object.GetRealPicturebyBase64(1, 50)
        }
        resolve(src)
      })
    },
    async caseProcessCover() { // 遮盖
      const src = await this.getCoverPic()
      if (src) {
        this.$parent.videoStatusArr[0].isMiddlePlay = true
        this.$parent.videoStatusArr[0].img = src
        this.$parent.videoStatusArr[0].isSyncPlay = true
        this.closeSound()
      }
    },
    caseProcessShow() { // 恢复显示
      if (
        this.$parent.videoStatusArr[0].img ||
        this.$parent.videoStatusArr[0].isSyncPlay ||
        this.$parent.videoStatusArr[0].isMiddlePlay
      ) {
        this.$parent.videoStatusArr[0].img = ''
        this.$parent.videoStatusArr[0].isSyncPlay = false
        this.$parent.videoStatusArr[0].isMiddlePlay = false
      }
    },
    changeScreen() { // 大小窗口切换
      this.$emit('changeScreen', this.paneMark)
    }
  },
  beforeDestroy() {
    this.clearTOpen()
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>

<style lang="less" scoped>
.single-most-outer {
  position: relative;
  z-index: 99;
  vertical-align: middle;
  box-sizing: border-box;
  border: 1.5px solid #000;
  display: inline-block;
  font-size: 12px;
  width: 100%;
  height: 100%;
}
.single-outer {
  position: relative;
  width: 100%;
  height: 100%;
  .sync-play-shade {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #000;
    span {
      font-size: 100px;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 999;
    }
  }
  .sync-play-img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    vertical-align: middle;
    width: 100%;
    z-index: 2;
  }
  .plugin-video,
  .label-video {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .plugin-video {
    position: relative;
    object {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    iframe {
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0px;
      background: #333;
      border: 0px;
    }
    .plugin-button {
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0px;
      .plugin-button-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .disable,
        .disable:hover {
          color: #878282;
        }
        .dp-con {
          position: relative;
          display: inline-block;
          ul {
            position: absolute;
            background-color: #335589;
            list-style: none;
            color: snow;
            text-align: center;
            line-height: 25px;
            padding: 0 6px;
            border-radius: 4px;
            top: 3px;
            right: 37px;
            i {
              display: block;
              position: absolute;
              background: #335589;
              width: 10px;
              height: 10px;
              transform: rotate(45deg);
              top: 7px;
              right: -13px;
            }
            li {
              display: inline;
              white-space: nowrap;
              line-height: 25px;
              padding: 0 8px;
              border-right: 1px solid hsla(0, 0%, 100%, 0.1);
            }
            .active {
              color: #fda54b;
            }
          }
          li:hover {
            color: #fda54b;
            cursor: pointer;
            margin: 2px 0;
          }
        }
        .div-null {
          display: flex;
          flex: 1;
        }
        i {
          font-size: 1.7em;
          margin: 0 8px;
          line-height: 30px;
          cursor: pointer;
        }
      }
      &.top {
        top: 0;
        .plugin-button-box {
          justify-content: flex-end;
          i:hover {
            color: #00a5e3;
          }
        }
      }
    }
  }
  .plugin-video.top {
    iframe {
      top: 0;
      height: 30px;
    }
  }
  .small-button {
    iframe {
      height: 30px;
    }
    .plugin-button {
      height: 30px;
      .plugin-button-box {
        i {
          font-size: 12px;
          margin: 0 3px;
        }
      }
    }
  }
}
.PTZbuttonBars {
  position: absolute;
  width: 20px;
  height: 20px;
  z-index: 2;
  background: #ddddee;
  .buttonBar-box {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    bottom: 0;
  }
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
