<template>
  <div class="uploadBox" v-if="uploadList.length">
    <div class="uploadModal">
      <div class="uploadStatus">
        <!-- 正在上传 -->
        <span class="progress_circle" v-if="isUploading">
          <svg width="24px" height="24px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress_background circle" r="50" cx="50" cy="50" fill="transparent"></circle>
            <circle class="progress_bar2 circle" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="()=>dasharrays"></circle>
            <circle class="progress_bar circle" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dasharray" :stroke-dashoffset="()=>dashOffset()"></circle>
          </svg>
        </span>
        <!-- 上传没有失败 -->
        <img class="status-icon" src="" v-else-if="!errorNum" />
        <!-- 上传失败 -->
        <img class="status-icon" src="" v-else />
      </div>
      <div class="uploadMsg">
        <!-- 正在上传 -->
        <div v-if="isUploading">{{ $t('collection.uploadingMsg1', { n1: ToLocaleNumber(upingIndex), n2: ToLocaleNumber(list.length), n3: targetName }) }}</div>
        <!-- 上传没有失败 -->
        <div v-else-if="!errorNum">{{ successNum > 1 ? $t('collection.uploadingMsg21', { n1: ToLocaleNumber(successNum), n2: targetName }) : $t('collection.uploadingMsg2', { n1: ToLocaleNumber(successNum), n2: targetName }) }}</div>
        <!-- 上传有失败 -->
        <div v-else>
          {{ $t('album.numupfailed', { n: ToLocaleNumber(successNum) }) }}
          <span class="detail" @click="showFailedDetailFlag = true">{{ $t('cookie.cookiestip2') }}</span>
        </div>
      </div>
      <div class="uploadButtons">
        <img class="icon-close" src="" @click="cancel" />
      </div>
    </div>
  </div>
</template>

<script>
import upload from './upload'

export default {
  name: 'uploadBox',
  mixins: [upload],
  mounted() {
    this.$on('upload-ready', ({ list }) => {
      this.list = list
    })
    this.$on('upload-start', ({ task, list }) => {
      this.isUploading = true
      this.upingIndex = list.findIndex(e => e.status === 'uping')
      this.targetName = task.targetName || ''
    })
    this.$on('upload-success', ({ list }) => {
      this.successNum = list.filter(e => e.code === '0').length
    })
    this.$on('upload-error', ({ list }) => {
      this.errorNum = list.filter(e => e.code !== '0').length
    })
    this.$on('upload-end', () => {
      this.isUploading = false
    })
  },
  data() {
    return {
      dashArray: Math.PI * 100,
      isUploading: false,
      showFailedDetailFlag: false,
      successNum: 0, // 成功数量
      upingIndex: 0, // 正在上传
      errorNum: 0, // 失败数量
      targetName: '',
      list: []
    }
  },
  methods: {
    dashOffset() {
      return this.dashArray * 0.5
    },
    // 清空上传
    cancel() {
      this.$emit('upload-clear')
      this.isUploading = false
      this.listLen = 0
      this.successNum = 0
      this.upingIndex = 0
      this.targetName = ''
      this.showFailedDetailFlag = false
    }
  }
}
</script>

<style lang="" scoped>
/* .bottom-modal {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  position: absolute;
  bottom: 15px;
  background-color: #fff;
} */
.uploadPanel {
  display: flex;
  min-height: 56px;
  align-items: center;
  box-shadow: 0 5px 10px 0 rgba(0,0,0,0.2);
  border-radius: 8px;
}
.uploadStatus {
  width: 56px;
  display: flex;
  justify-content: center;
}
.uploadMsg {
  flex: 1;
}
.uploadButtons {
  width: 52px;
  display: flex;
  justify-content: center;
}
.clc_upload {
  width: 100%;
  height: 49px;
  line-height: 49px;
  padding: 0 16px;
  background-color: #fff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 64px;
}
.uploadContent {
  width: 100%;
  height: 100%;
}
.finishedImg,
.failedImg {
  width: 24px;
  height: 49px;
  float: left;
  margin-right: 16px;
}
.finishedIcon,
.failedIcon {
  width: 24px;
  height: 24px;
  margin-top: 12px;
}
.status-icon {
  width: 24px;
  height: 24px;
}
.progress_circle .circle {
  stroke-width: 0.8rem;
  transform-origin: center;
}
.progress_circle .progress_background {
  transform: scale(0.9);
  stroke: #000;
}
.progress_circle .progress_bar {
  transform: scale(0.9) rotate(-90deg);
  stroke: #007dff;
}
.progress_circle .progress_bar2 {
  transform: scale(0.9) rotate(-90deg);
  stroke: #eee;
}
.uploadFinish,
.failedDetail {
  height: 100%;
}
.close {
  height: 49px;
  float: right;
}
.icon-close {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.detail {
  cursor: pointer;
  color: #007dff;
}
</style>
