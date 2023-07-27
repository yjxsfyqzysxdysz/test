<template>
  <div class="tips" v-if="tipsToggle">
    <div class="tipspan" :style="tipSpanleft ? leftStyle : rightStyle"></div>
    {{ message }}
    <img class="tipsImg" src="" @click="tipsClose" />
  </div>
</template>

<script>
export default {
  name: 'tips',
  props: {
    message: {
      type: String,
      default: ''
    },
    tipSpanleft: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.tipsToggle = localStorage.TipsShow === 'true'
  },
  data() {
    return {
      leftStyle: {
        left: 10 + 'px'
      },
      rightStyle: {
        right: 10 + 'px'
      },
      tipsToggle: false
    }
  },
  methods: {
    tipsClose() {
      localStorage.TipsShow = false
      this.tipsToggle = false
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
  .tips {
    height: 32px;
    line-height: 12px;
    padding: 8px 7px 8px 10px;
    position: absolute;
    background-color: rgba(77, 77, 77, .95);
    border-radius: 4px;
    color: #fff;
    font-size: 12px;
    z-index: 99;
    letter-spacing: 0;
    text-align: left;
    white-space: nowrap;
  }
  .tips .tipspan {
    width: 0;
    height: 0;
    position: absolute;
    top: -8px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 9px solid rgba(77, 77, 77, .95);
  }
  .tips .tipsImg {
    width: 20px;
    margin: -1px 0 0;
    vertical-align: middle;
  }
</style>
