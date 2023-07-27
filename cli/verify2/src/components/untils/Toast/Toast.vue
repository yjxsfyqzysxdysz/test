<template>
  <div class="toast" v-if="!isCloseItem || isShow">
    <!-- vue 过渡组件 -->
    <transition :name="isClose ? 'slow-fade' : 'fade'">
      <div :id="id" class="kiko-message" :class="{'message-cus':isClose}" v-if="isShow" :style="styleModel">
        <div v-if="isClose" class="toast-close" @click="closeItem"></div>
        <div v-if="isClose" class="textOverMargin" v-html="message"></div>
        <div v-else class="textOver">{{message}}</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'toast',
  mounted() {
    this.close()
  },
  computed: {
    styleModel() {
      return {
        left: this.left,
        top: this.top,
        display: this.isCloseItem ? 'none' : 'inline-block'
      }
    }
  },
  data() {
    return {
      id: '',
      isCloseItem: false,
      message: '',
      time: 3000,
      isShow: true,
      isClose: false,
      left: '50%',
      top: 'unset'
    }
  },
  methods: {
    close() {
      setTimeout(() => {
        this.isShow = false
      }, this.time)
    }
  }
}
</script>

<style lang="scss" scoped>
  .toast .kiko-message {
    position: absolute;
    padding: 12px 32px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 22px;
    bottom: 96px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 998;
    font-size: 16px;
  }
  .toast .kiko-message.message-cus {
    color: #666;
    background-color: rgba(221, 221, 221, 0.9);
    border-radius: 12px;
    padding: 16px 20px;
    line-height: 24px;
    max-width: 400px;
    word-wrap: break-word;
    text-indent: 0;
    bottom: inherit;
    transform: translate(0);
  }
  .toast .message-cus::before {
    content: '';
    position: absolute;
    display: inline-block;
    width: 0;
    height: 0;
    left: 50%;
    bottom: 0;
    border-style: solid;
    border-width: 5px;
    border-color: transparent #ddd #ddd transparent;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: transparent;
  }
  .toast .toast-close {
    position: absolute;
    width: 24px;
    height: 24px;
    top: 6px;
    right: 6px;
    cursor: pointer;
    transform: rotate(45deg);
    background-image: url();
  }
  .toast .textOver {
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .toast .textOverMargin {
    width: 200px;
    margin-top: 18px;
    margin-bottom: 12px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to,
  .slow-fade-enter,
  .slow-fade-leave-to {
    opacity: 0;
  }
  .slow-fade-enter-active,
  .slow-fade-leave-active {
    transition: opacity 4s;
  }
</style>
