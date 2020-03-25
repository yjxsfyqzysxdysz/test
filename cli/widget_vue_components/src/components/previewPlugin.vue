<template>
  <div class="video-plugin" :class="[buttonFreedom && !isFullScreen ? 'buttonFreedom' : '', isFullScreen ? 'isFullScreen' : '']"  v-resize="resizeFn">
    <div :class="['single-video-plugin', isFullScreen ? 'full-video-plugin' : '']" ref="singleVideo" :style="{ height: isButton && !isFullScreen  ? 'calc(100% - 56px)' : '100%' }">
      <plugin ref="plugin" style="padding: 1px" v-for="(item, index) in defaultTotalPane" :key="index" :paneMark="index" :isMaximize="isMaximize" :defaultPane="defaultPane" :style="[returnStyleIndex(index), hidden(index), active(index)]" :singleStatus="videoStatusArr[index]"  @changeScreen="changeScreen" @clickEvent="clickEvent" @updateStatus="updateStatus" @pluginEscCall="pluginEscCall" :pluginIconShow='pluginIconShow' :appendTopButtons="appendTopButtonsFun(index)"></plugin>
      <plugin style="background: #888" :style="[pluginSize[(item + defaultTotalPane - 1) % checkedWmode]]" v-for="item in nullDiv" :key="item + defaultTotalPane"></plugin>
    </div>
    <div class="video-bottom" v-if="isButton" :class="[isBottonToggle ? 'bottonShow' : 'bottonHide']">
      <i class="icon iconfont icon-preview-stopall" :class="{'disable': isPlayPluginInfo.length===0}" title="关闭全部预览" @click="stopPreviewALL" v-if="iconshow.stopAll"></i>
      <i class="icon iconfont icon-preview-stop" :class="{'disable': !selectedObj.isPlay}" title="关闭预览" @click="stopPreview(checkedPane)" v-if="iconshow.stop"></i>
      <i class="icon iconfont" :class="[selectedObj.isPlay? 'icon-preview-stop' : 'icon-preview']" :title="[selectedObj.isPlay?'关闭预览':'预览']" @click="startStopPreview" v-if="iconshow.startStop"></i>
      <div class="dp-con left" @mouseenter="showVideotape = true" @mouseleave="showVideotape = false" v-if="iconshow.isRecording">
        <i class="icon iconfont icon-recplayback" :class="{'disable': !selectedObj.isPlay}" title="录像" ></i>
        <ul v-show="showVideotape && selectedObj.isPlay">
          <i></i>
          <li v-for="(item, i) in videotapeList" @click="openRecording(item)" :key="i">{{item.label}}</li>
        </ul>
      </div>
      <i class="icon iconfont icon-screenshot" :class="{'disable': !selectedObj.isPlay}" title="截图" @click="getCapture" v-if="iconshow.screenshot"></i>
      <i class="icon iconfont icon-yuntai" :class="{'disable': (!selectedObj.isPlay || (selectedObj.source && selectedObj.source.monitortype < 3))}" title="云台" @click="PTZClick()" v-if="iconshow.yuntai"></i>
      <i class="icon iconfont" :class="[selectedObj.isBoost? 'icon-nk-close' : 'icon-niaokan', !selectedObj.isPlay? 'disable' : '']" :title="[selectedObj.isBoost?'关闭鸟瞰':'开启鸟瞰']" @click="boost()" v-if="iconshow.niaokan"></i>
      <i class="icon iconfont" :class="[selectedObj.isSpeech? 'icon-shipinlei-duijiang': 'icon-shipinleiduijiangjinyong', !selectedObj.isPlay? 'disable': '']" :title="[selectedObj.isSpeech?'关闭对讲':'对讲']" @click="clickSpeech()" v-if="iconshow.speech"></i>
      <i class="icon iconfont" :class="[selectedObj.showVolume&&selectedObj.isPlay? 'icon-volume': 'icon-mute', !selectedObj.isPlay? 'disable': '']" title="音量调节" @click="volumeSwitch" v-if="iconshow.volume"></i>
      <div style="width:120px;display:inline-block;vertical-align:top;line-height:45px" v-if="selectedObj.showVolume">
        <slider color="#20a1ff" :range="true" :size="100" :minValue='0' v-model="selectedObj.volumeValue" @change="changeVolume"></slider>
      </div>
      <div class="nodiv">
      </div>
      <div v-if='iconshow.panePage' style="margin-right:10px">
        <Page @on-change='pageChange' :current="curPage" :total="videoPageData.length" :page-size="checkedWmode" show-total/>
      </div>
      <div class="dp-con right" @mouseenter="showmodeShow=true" @mouseleave="showmodeShow=false" v-if="iconshow.multiScreen">
        <ul v-show="showmodeShow">
          <li v-for="mode in panesArr" :key='mode.value' @click="clickCheckedWmode(mode)" :class="{active: mode.value===checkedWmode}">{{mode.label}}</li>
          <i></i>
        </ul>
        <i class="icon iconfont icon-multi-screen" title="画面分割"></i>
      </div>
      <div class="dp-con right" @mouseenter="showSetStream=true" @mouseleave="showSetStream=false" v-if="iconshow.streamChange">
        <ul v-show="showSetStream && selectedObj.isPlay">
          <li v-for="mode in streamArr" :key='mode.value' @click="changeStream(mode.value)" :class="{active: mode.value===(selectedObj.source && selectedObj.source.streamType)}">{{mode.label}}</li>
          <i></i>
        </ul>
        <i class="icon iconfont icon-stream-set" :class="{'disable': !selectedObj.isPlay}" title="码流切换"></i>
      </div>
      <i class="icon iconfont" :class="[selectedObj.fullScreen&&selectedObj.isPlay? 'icon-exit-full-screen': 'icon-full-screen', !selectedObj.isPlay? 'disable': '']" :title="[selectedObj.fullScreen?'退出全屏':'全屏']" @click="fullScreen" v-if="iconshow.fullScreen"></i>
      <i class="icon iconfont icon-tv-wall" :class="{'disable': !selectedObj.isPlay}" title="快速上墙" v-if="iconshow.tvWall"></i>
      <i class="icon iconfont icon-view-quick" title="录像回放" @click="changeToBack" v-if="iconshow.toBack"></i>
    </div>
  </div>
</template>

<script>
import plugin from './plugin'
import { openFlow } from './preview'
import Slider from './Slider'
export default {
  components: {
    plugin,
    Slider
  },
  props: {
    panesArr: {
      // 窗格配置选项
      type: Array,
      default: () => [
        { value: 1, label: '单画面' },
        { value: 4, label: '四画面' },
        // { value: 5, label: '五画面' },
        { value: 9, label: '九画面' },
        { value: 16, label: '十六画面' }
      ]
    },
    isButton: {
      // 视频窗下方总按钮条
      type: Boolean,
      default: true
    },
    pType: { // 预览定制类型
      type: String,
      default: ''
    },
    buttonFreedom: { // 是否使主按钮栏通过点击显隐
      type: Boolean,
      default: false
    },
    defaultPane: {
      // 默认显示窗格数量
      type: Number,
      default: 4
    },
    defaultTotalPane: {
      // 默认总窗格数量
      type: Number,
      default: 16
    },
    iconshow: {
      // 对应图标是否显示
      type: Object,
      default: () => {
        return {
          stopAll: false, // 关闭全部预览
          stop: false, // 关闭单个预览
          startStop: false, // 打开或者关闭预览按钮，用于单窗口
          screenshot: false, // 截图
          yuntai: false, // 云台
          niaokan: false, // 鸟瞰
          speech: false, // 对讲
          isRecording: false, // 录像
          volume: false, // 音量调节
          fullScreen: false, // 全屏
          multiScreen: false, // 画面分割
          streamChange: false, // 切换码流
          panePage: false, // 上一屏、下一屏
          panePageNum: false, // 当前屏页码
          tvWall: false, // 快速上墙
          toBack: false // 录像回放
        }
      }
    },
    appendTopButtons: { // 视频窗口上方的按钮
      type: Object,
      default: () => {
        return {
          toggle: false, // 是否显示
          buttons: [] // 显示那些按钮 change: 交换
        }
      }
    },
    pluginIconShow: {
      // 单个插件内图标下方显示图标按钮
      type: Object,
      default: () => {
        return {
          showBottomIcon: true, // 图标按钮条
          hidemenuIcon: true, // 隐藏
          previewStopIcon: true, // 关闭预览
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
  computed: {
    pluginSize() { // 各个视频框大小数组
      let arr = []
      if ([1, 4, 9, 16].includes(this.checkedWmode)) {
        let pWidth = `${100 / Math.sqrt(this.checkedWmode)}%`
        for (let index = 0; index < this.checkedWmode; index++) {
          if (this.isMaximize && index === this.checkedPane % this.checkedWmode) {
            arr.push({ width: '100%', height: '100%' })
          } else if (this.isMaximize && index !== this.checkedPane % this.checkedWmode) {
            arr.push({ width: pWidth, height: pWidth, position: 'absolute', left: '-9999px', top: '-9999px' })
          } else {
            arr.push({ width: pWidth, height: pWidth })
          }
        }
      } else if (this.checkedWmode === 5) {
        // if (this.isMaximize) { // 布局5画面时双击是大小窗口切换，不是全屏
        if (this.isFullScreen) { // 全屏时
          arr = [
            { left: '-9999px', top: '-9999px', width: '80%', height: '100%', position: 'absolute' },
            { left: '-9999px', top: '-9999px', width: '20%', height: '25%', position: 'absolute' },
            { left: '-9999px', top: '-9999px', width: '20%', height: '25%', position: 'absolute' },
            { left: '-9999px', top: '-9999px', width: '20%', height: '25%', position: 'absolute' },
            { left: '-9999px', top: '-9999px', width: '20%', height: '25%', position: 'absolute' }
          ]
          let aIndex = this.screenIndex[this.checkedPane] % this.checkedWmode
          arr[aIndex] = {
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute'
          }
        } else {
          arr = [
            { left: 0, top: 0, width: '80%', height: '100%', position: 'absolute' },
            { left: '80%', top: 0, width: '20%', height: '25%', position: 'absolute' },
            { left: '80%', top: '25%', width: '20%', height: '25%', position: 'absolute' },
            { left: '80%', top: '50%', width: '20%', height: '25%', position: 'absolute' },
            { left: '80%', top: '75%', width: '20%', height: '25%', position: 'absolute' }
          ]
        }
      }
      return arr
    },
    selectedObj() {
      return this.videoStatusArr[this.checkedPane]
    },
    totalPage() { // 总页数
      return Math.ceil(this.videoPageData.length / this.checkedWmode) < 1 ? 1 : Math.ceil(this.videoPageData.length / this.checkedWmode)
    },
    nullDiv() { // 最后一页补窗格数
      return this.curPage * this.checkedWmode - this.defaultTotalPane > 0 ? this.curPage * this.checkedWmode - this.defaultTotalPane : 0
    },
    isPlayPluginInfo() { // 正在播放的预览信息
      let sourceList = this.videoStatusArr.filter(item => item.isPlay)
      return sourceList
    },
    videotapeList() {
      return [
        { value: '本地录像', label: this.localPlayer },
        { value: '中心录像', label: this.centrePlayer }
      ]
    },
    localPlayer() {
      return this.selectedObj.isRecording ? '关闭本地录像' : '本地录像'
    },
    centrePlayer() {
      return this.selectedObj.isCentreRecording ? '关闭中心录像' : '中心录像'
    }
  },
  data() {
    return {
      isPlay: false,
      checkedPane: 0, // 当前选中视频框的index
      showmodeShow: false, // 窗格配置显示
      checkedWmode: this.defaultPane, // 当前窗格数量
      isMaximize: false, // 单画面(双击)
      videoStatusArr: [],
      curPage: 1, // 当前页
      videoPageData: [], // 分页播放数据
      isBottonToggle: false, // 是否显示按钮栏
      isFullScreen: false, // 组件全屏状态
      showSetStream: false,
      showVideotape: false, // 显示录像类型
      streamArr: [
        { value: 'main', label: '主码流' },
        { value: 'sub1', label: '子码流' }
      ],
      screenIndex: {}, // 窗口对应下标，用于5布局窗口大小间样式切换
      savePreviewData: {
        cameraName: '20.44_视频通道_通道1',
        channel: 1,
        devIp: '192.168.20.44',
        devPort: 80,
        dport: 554,
        monitortype: 3,
        resId: '5dea182cb915d23760ca9a2f',
        streamType: 'main'
      } // 保存预览的数据，用于单窗口重新打开
    }
  },
  created() {
    this.initStyleIndex()
    this.initializeArr()
  },
  mounted() {
    this.escFn = e => {
      if (e.which === 27 || e.keyCode === 27) {
        this.exitFullscreen()
        this.updateStatus(this.checkedPane, { fullScreen: false }, 'isButton')
        this.isFullScreen = false
        this.$emit('changeFullscreen', false)
        if (this.checkedWmode !== 1 && this.isMaximize) {
          this.isMaximize = false
        }
      }
    }
    document.addEventListener('keydown', this.escFn, false)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.escFn, false)
  },
  methods: {
    startStopPreview() { // 用于单窗口的打开或者关闭预览
      if (!this.selectedObj.isPlay) {
        this.openPreview(this.savePreviewData)
      } else {
        this.stopPreview(this.checkedPane)
      }
    },
    savePreviewInfo(data) { // 保存预览原始数据，用于单窗口重新打开预览
      this.savePreviewData = data
    },
    changeScreen(i) { // 点击交换窗口时
      let j = 0
      for (let k = (this.checkedWmode * (this.curPage - 1)); k < (this.checkedWmode * this.curPage); k++) {
        if (this.screenIndex[k] % this.checkedWmode === 0) {
          j = k
          let para = { ...this.screenIndex }
          para[i] = this.screenIndex[j]
          para[j] = this.screenIndex[i]
          this.screenIndex = { ...para }
          this.changeStream('sub1', k)
          this.changeStream('main', i)
          break
        }
      }
    },
    appendTopButtonsFun(index) { // 计算窗口内切换窗口按钮是否显示
      return { ...this.appendTopButtons, toggle: !this.isMaximize && (this.screenIndex[index] % this.checkedWmode !== 0) && (this.checkedPane === index) && this.appendTopButtons.toggle }
    },
    initStyleIndex() { // 初始化screenIndex
      this.screenIndex = {}
      for (let i = 0; i < this.defaultTotalPane; i++) {
        this.screenIndex[i] = i
      }
    },
    returnStyleIndex(index) { // 计算窗口对应样式
      let rIndex = this.screenIndex[index] % this.checkedWmode
      return this.pluginSize[rIndex]
    },
    hidden(index) { // 隐藏窗格
      if (
        this.isMaximize
          ? index !== this.checkedPane
          : index > this.checkedWmode * this.curPage - 1 || index < this.checkedWmode * (this.curPage - 1)
      ) {
        return { position: 'absolute', left: '-9999px', top: '-9999px' }
      }
    },
    active(index) { // 选中窗格
      if (this.checkedPane === index) {
        return { 'border-color': '#4699f9' }
      }
    },
    pageChange(val) { // 当前屏改变
      let oldCurPage = this.curPage
      this.curPage = val
      this.isMaximize = false
      this.checkedPane = (this.curPage - 1) * this.checkedWmode
      let maxWodineNum = (this.curPage * this.checkedWmode > this.defaultTotalPane) ? this.defaultTotalPane : (this.curPage * this.checkedWmode)
      for (let index = this.checkedPane; index < maxWodineNum; index++) { // 打开当前屏预览
        if (this.videoPageData[index]) {
          this.openPreview(this.videoPageData[index], index)
        }
      }
      for (let index = (oldCurPage - 1) * this.checkedWmode; index < oldCurPage * this.checkedWmode; index++) { // 关闭之前屏的预览
        if (this.videoStatusArr[index] && this.videoStatusArr[index].isPlay) {
          this.stopPreview(index, true)
        }
      }
    },
    pluginEscCall(index, type, keyCode) { // 插件监听键盘事件回调
      if (Number(keyCode) === 27) {
        this.isFullScreen && this.fullScreen()
      }
    },
    async changeStream(val, index = this.checkedPane) { // 码流切换
      let element = this.videoStatusArr[index]
      if (!element.isPlay) { return }
      if (val === element.source.streamType) { return }
      let videoData = JSON.parse(JSON.stringify(element.source))
      videoData.streamType = val
      let pStatus = await this.openIndexPreview(videoData, index)
      if (pStatus !== 0) { // 切换失败，重开之前码流
        console.log(pStatus, '码流切换失败，重开之前码流')
        this.openIndexPreview(element.source, index)
      }
    },
    pluginDom(index) { // 返回指定窗格的 object dom
      return index === undefined ? this.$refs.plugin[this.findFreePane()].$refs.object : this.$refs.plugin[index].$refs.object
    },
    initializeArr() { // 初始化窗格状态数组
      let arr = []
      for (let index = 0; index < this.defaultTotalPane; index++) {
        let obj = {
          isPlugin: true,
          playStatus: false,
          isButton: false,
          isPlay: false,
          isBoost: false,
          isSpeech: false,
          isRecording: false,
          isCentreRecording: false,
          fullScreen: false,
          showVolume: false,
          volumeValue: 50
        }
        arr.push(obj)
      }
      this.videoStatusArr = arr
    },
    async clickCheckedWmode(mode) { // 画面切换将选中项及是否单画面置为初始值
      if (this.checkedWmode === mode.value) { return }
      for (let index = 0; index < this.defaultTotalPane; index++) {
        await this.stopPreview(index, true)
      }
      let obj = document.querySelector('.single-video-plugin')
      obj.style.opacity = '0'
      this.checkedWmode = mode.value
      this.isMaximize = false
      this.checkedPane = 0
      this.curPage = 1
      setTimeout(() => {
        obj.style.opacity = '1'
      }, 800)
      for (let index = 0; index < this.checkedWmode; index++) {
        if (this.videoPageData[index]) {
          await this.openPreview(this.videoPageData[index])
        }
      }
    },
    playStop() { // 播放停止
      // this.isPlay = !this.isPlay
      // let obj = {
      //   devIp: '192.168.20.36',
      //   devPort: 3721,
      //   channel: 1,
      //   streamType: 'main',
      //   resId: '5c26d593cc13923fd8aa59e4',
      //   cameraName: '镜头名称'
      // }
      // let obj = {rtmp: 'rtmp://58.200.131.2:1935/livetv/hunantv'}
      let arr = [
        // { rtmp: 'rtmp://58.200.131.2:1935/livetv/hunantv' },
        {
          devIp: '192.168.20.36',
          devPort: 3721,
          channel: 1,
          streamType: 'main',
          resId: '5c26d593cc13923fd8aa59e4',
          cameraName: '镜头名称'
        },
        {
          devIp: '192.168.20.36',
          devPort: 3721,
          channel: 1,
          streamType: 'main',
          resId: '5c26d593cc13923fd8aa59e4',
          cameraName: '镜头名称'
        }
      ]
      // for (let index = 0; index < 5; index++) {
      //   arr.push(JSON.parse(JSON.stringify(obj)))
      // }
      // this.openPreview({ rtmp: 'rtmp://58.200.131.2:1935/livetv/hunantv' })
      // this.openPreview(obj)
      this.openAll(arr)
    },
    clickEvent(index, clickType, paneMark) { // 返回参数 index：插件窗格号 clicktype：单机还是双击
      // 点击事件
      this.checkedPane = paneMark
      if (clickType === 1) {
        this.isBottonToggle = !this.isBottonToggle
        if (this.pType === 'map') {
          this.isBottonToggle ? this.$parent.$parent.sethierachySize('800px', '547px') : this.$parent.$parent.sethierachySize('800px', '490px') // 给videoHierarchy组件设置宽高，否则2个窗口重叠插件会遮挡工具栏
        }
      } else if (clickType === 2) {
        let obj = document.querySelector('.single-video-plugin')
        obj.style.opacity = '0'
        this.isMaximize = this.checkedWmode !== 1 && this.checkedWmode !== 5 && !this.isMaximize // 单窗格不允许切换单画面，5窗口双击是大小窗口切换
        setTimeout(() => {
          obj.style.opacity = '1'
        }, 800)
        if (this.checkedWmode === 5) { // 5窗口双击是大小窗口切换
          this.changeScreen(this.checkedPane)
        } else {
          if (this.isMaximize) {
            this.changeStream('main')
          } else {
            let streamType = this.isMain(this.checkedPane) ? 'main' : 'sub1'
            this.changeStream(streamType)
          }
        }
        if (this.checkedWmode === 1) {
          this.fullScreen()
        }
      }
    },
    updateStatus(index, obj, type) { // 跟新视频窗格上的功能条
      if (type === 'isButton') {
        this.videoStatusArr.forEach(element => {
          element.isButton = false
        })
      }
      // 子组件更新状态数组
      for (const key in obj) {
        this.videoStatusArr[index][key] = obj[key]
      }
    },
    findFreePane() { // 找出空闲窗格返回窗格索引
      for (let index = (this.curPage - 1) * this.checkedWmode; index < this.curPage * this.checkedWmode; index++) {
        if (!this.videoStatusArr[index].isPlay) {
          return index
        }
      }
      return this.checkedPane
    },
    getRealPicturebyBase64(nImgType = 1, nJpgQuality = 100) {
      // [in] nImgType     需要抓取的图片类型 1:jpg 0:bmp
      // [in] nJpgQuality    当抓取为jpg时的图片质量 1-100
      // 抓图保存成Base64数据
      let arr = []
      for (let index = 0; index < this.checkedWmode; index++) {
        let dom = this.pluginDom(index)
        dom ? arr.push(dom.GetRealPicturebyBase64(nImgType, nJpgQuality)) : arr.push('')
      }
      return arr
    },
    openRecording(val) { // 录像
    },
    getCapture() { // 截图
      if (!this.selectedObj.isPlay) { return }
      this.$refs.plugin[this.checkedPane].getCapture()
    },
    PTZClick() { // 云台
      if (!this.selectedObj.isPlay) {
        return
      }
      this.$refs.plugin[this.checkedPane].PTZClick()
    },
    boost() { // 鸟瞰
      if (!this.selectedObj.isPlay) { return }
      this.$refs.plugin[this.checkedPane].boost()
    },
    clickSpeech() { // 对讲
    },
    volumeSwitch() { // 音量开关
      if (!this.selectedObj.isPlay) { return }
      if (this.selectedObj.showVolume) {
        this.$refs.plugin[this.checkedPane].closeSound()
      } else {
        for (let index = 0; index < this.defaultTotalPane; index++) { // 关闭所有音量
          if (this.videoStatusArr[index].showVolume) {
            this.$refs.plugin[index].closeSound()
          }
        }
        this.$refs.plugin[this.checkedPane].openSound()
        this.$refs.plugin[this.checkedPane].setSoundValue(50)
        let soundStatue = this.$refs.plugin[this.checkedPane].getSoundValue()
        if (soundStatue.success) {
          let objVolumeValue = { volumeValue: soundStatue.Volume }
          this.updateStatus(this.checkedPane, objVolumeValue)
        } else {
          this.$Notice.warning({ title: '警告', desc: '音量获取失败！' })
        }
      }
    },
    changeVolume(v) {
      if (!this.selectedObj.isPlay) {
        return
      }
      this.$refs.plugin[this.checkedPane].setSoundValue(v)
    },
    fullScreen() { // 全屏
      if (!this.selectedObj.isPlugin) {
        this.$refs.plugin[this.checkedPane].playFullscreen()
        return
      }
      if (this.isFullScreen) {
        this.isFullScreen = false
        this.updateStatus(this.checkedPane, { fullScreen: false }, 'isButton')
        this.$emit('changeFullscreen', false)
        this.exitFullscreen()
        if (this.checkedWmode !== 1 && this.isMaximize) {
          this.isMaximize = false
        }
      } else {
        if (this.checkedWmode !== 1 && !this.isMaximize) {
          this.isMaximize = true
        }
        this.requestFullscreen()
        this.isFullScreen = true
        this.updateStatus(this.checkedPane, { fullScreen: true }, 'isButton')
        this.$emit('changeFullscreen', true)
      }
    },
    /**
     * 页面尺寸改变事件
     * 解决360浏览器全屏模式下keydown事件不触发问题
     */
    resizeFn() {
      if (
        !(
          document.fullscreenEnabled ||
          window.fullScreen ||
          document.webkitIsFullScreen ||
          document.msFullscreenEnabled
        )
      ) {
        this.escFn({ which: 27 })
      }
    },
    changeToBack() {
      this.stopPreviewALL()
      this.$emit('update:toggle', 'playBack')
    },
    async stopPreviewALL(isDom) { // 关闭全部预览
      // isDom 是true 就不销毁 object 标签
      this.videoPageData = []
      for (let index = 0; index < this.videoStatusArr.length; index++) {
        await this.stopPreview(index, isDom)
        this.$refs.plugin[index].clearTOpen()
      }
      this.curPage = 1
      this.checkedPane = 0
      this.$emit('stopPreviewALL')
    },
    async stopPreview(index, isDom) {
      const element = this.videoStatusArr[index]
      if (!element.source) { return }
      let elementSource = JSON.parse(JSON.stringify(element.source))
      let obj = { isPlay: false, playStatus: false, isBoost: false, source: '' }
      if (!element.isPlugin) {
        // rtmp 停止
        this.$refs.plugin[index].stopRtmp()
      }
      if (element.isPlay && element.isPlugin) { // 有播放在关闭
        if (element.isCentreRecording) {
          this.$refs.plugin[index].stopCentreRecord()
        }
        if (element.isSpeech) { // 关闭对讲
        }
        if (element.showVolume) { // 关闭伴音
          this.$refs.plugin[index].closeSound()
        }
        if (isDom) {
          obj.playStatus = true
        }
        let dom = this.pluginDom(index)
        dom && dom.CloseRealStream()
        this.$refs.plugin[index].showPTZ = false
        this.updateStatus(index, obj)
      }
      if (elementSource) {
        this.$emit('stopBack', elementSource)
      }
      if (!isDom) {
        this.videoPageData[index] = ''
      }
    },
    isMain(index) { // 判断是不是主码流预览
      if (this.checkedWmode >= 9) {
        return false
      } else if (this.checkedWmode <= 4) {
        return true
      } else if (this.checkedWmode === 5) {
        if (this.screenIndex[index] % this.checkedWmode === 0) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    },
    async openAll(data) { // 全部预览
      await this.stopPreviewALL(true)
      this.curPage = 1
      this.checkedPane = 0
      if (data.length > this.defaultTotalPane) {
        this.$Notice.warning({ title: '警告', desc: '无空闲窗口显示更多通道！' })
      }
      this.videoPageData = data
      for (let index = 0; index < this.checkedWmode; index++) {
        if (data[index]) {
          await this.openPreview(data[index])
        }
      }
    },
    async openPreview(data, pIndex) {
      let videoData = JSON.parse(JSON.stringify(data))
      // let index = pIndex
      // if (typeof (index) !== 'number') {
        let index = this.findFreePane()
        this.checkedPane = index
        if (this.selectedObj.isPlay) {
          this.$Notice.warning({ title: '警告', desc: '无空闲窗口显示更多通道！' })
          return
        }
      // }
      // 预览方法抛出
      // if (data.hasOwnProperty('rtmp')) {
      //   // data = {rtmp: 'rtmp://58.200.131.2:1935/livetv/hunantv'}
      //   this.$refs.plugin[index].openRtmp(videoData.rtmp)
      //   this.updateStatus(index, { source: videoData })
      //   this.$emit('openBack', videoData)
      //   return
      // }
      // 校园平台插件预览
      // --------------start-----------
      //  data = {
      //   devIp: data.devIp,
      //   devPort: data.devPort,
      //   channel: data.channel,
      //   streamType: data.streamType || 'main',
      //   resId: 资源id,
      //   cameraName: 镜头名称
      // }
      if (this.isMain(index)) { // 判断码流类型
        videoData.streamType = 'main'
      } else {
        videoData.streamType = 'sub1'
      }
      this.updateStatus(index, { isPlugin: true, playStatus: true, isButton: false, isPlay: false })
      this.$nextTick(async() => {
        let status = await openFlow(this.pluginDom(index), videoData)
        if (status !== 0) {
          this.errorMsg('开流失败！')
          this.updateStatus(index, { isPlay: false })
          return
        }
        this.$refs.plugin[index].clearTOpen()
        this.updateStatus(index, { source: videoData })
        this.videoPageData[index] = videoData
        this.$emit('openBack', videoData)
      })
      this.updateStatus(index, { isPlay: true }) // $nextTick 是异步 先改成播放状态
      // --------------end-----------
    },
    async openIndexPreview(data, index) { // 指定窗口预览
      let videoData = JSON.parse(JSON.stringify(data))
      this.updateStatus(index, { isPlugin: true, playStatus: true, isPlay: false })
      await this.$nextTick()
      let status = await openFlow(this.pluginDom(index), videoData)
      if (status === 0) {
        this.$refs.plugin[index].clearTOpen()
        this.updateStatus(index, { isPlay: true, source: videoData })
        this.videoPageData[index] = videoData
        this.$emit('openBack', videoData)
      }
      return status
    }
  }
}
</script>

<style lang="less" scoped>
.video-plugin {
  background-color: #404040;
  width: 100%;
  height: 100%;
  .single-video-plugin {
    position: relative;
    overflow: hidden;
    width: 100%;
    font-size: 0px;
    .shade-iframe {
      width: 100%;
      height: 100%;
      background-color: #404040;
      border: 0px;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .maximize {
      width: 100% !important;
      height: 100%;
    }
  }
  .full-video-plugin {
    height: 100%;
    width: 100%;
    position: absolute;
    left:0;
    top:0;
    z-index:16;
  }
  .video-bottom {
    width: 100%;
    height: 56px;
    background-color: #1b3153;
    display: flex;
    justify-content: flex-end;
    line-height: 56px;
    .nodiv {
      display: flex;
      flex: 1;
    }
    i {
      padding: 0 8px;
      cursor: pointer;
      font-size: 20px;
    }
    .right {
      ul {
        right: 38px;
        i {
          right: -7px;
        }
      }
    }
    .left {
      ul {
        left: 38px;
        i {
          left: -7px;
        }
      }
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
          line-height: 40px;
          padding: 0 6px;
          border-radius: 4px;
          top: 7px;
          display: flex;
          i {
            display: block;
            position: absolute;
            background: #335589;
            width: 14px;
            height: 14px;
            transform: rotate(45deg);
            top: 13px;
          }
          li {
            display: inline;
            white-space: nowrap;
            line-height: 40px;
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
        }
      }
    .disable,
    .disable:hover {
      color: #878282;
      cursor: not-allowed;
    }
  }
}
.isFullScreen {
  height: 100%;
  width: 100%;
  position: fixed;
  left:0;
  top:0;
  z-index: 99999;
}
// 点击窗口，主按钮栏显隐性
.buttonFreedom {
  position: relative;
  .single-video-plugin {
    height: 100% !important;
    background: #404040;
    z-index: 10;
  }
  .video-bottom {
    position: absolute;
    width: 100%;
    padding: 0 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    transform: translateY(100%);
    bottom: 56px;
    transition: bottom 1s;
  }
  .bottonShow {
    bottom: 0px;
  }
  .bottonHide {
    bottom: 56px;
  }
}
</style>
