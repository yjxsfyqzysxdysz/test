<template>
  <transition name="messageFade">
    <div class="messageBox" ref="messageBox" tabIndex="0" :class="messageClass" :style="messageStyle" v-show="visible" :aria-label="message">
      <div class="messageContent" v-if="mode === 'message'">{{ message }}</div>
      <div v-else>
        <div class="bubbleCount" v-html="message"></div>
        <svg-icon iconClass="close" className="close_icon" @click="close"></svg-icon>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'messageBox',
  mounted() {
    this.startTimer()
    if (this.supportAria) {
      this.$nextTick(() => {
        this.$refs.messageBox && this.$refs.messageBox.focus()
      })
    }
  },
  computed: {
    messageClass() {
      return {
        message: this.mode === 'message',
        bubble: this.mode === 'bubble',
        isTop: this.isTop
      }
    },
    messageStyle() {
      if (this.mode === 'bubbla') {
        return {
          top: this.top + 'px',
          right: this.right + 'px'
        }
      }
      return {}
    }
  },
  data() {
    return {
      mode: 'message', // message | bubble
      visible: true,
      isTop: '', // 展示位置
      duration: 3000,
      closed: false,
      timer: null,
      top: 100,
      left: 450,
      supportAria: false
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },
  methods: {
    clearTimer() {
      clearTimeout(this.timer)
      this.timer = null
    },
    startTimer() {
      if (this.duration) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },
    close() {
      this.closed = true
    },
    destroyElement() {
      this.$el.removeEventListener('transitionedn', this.destroyElement)
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
.messageBox {
  position: fixed;
  left: 50%;
  bottom: 70px;
  z-index: 2000;
  .messageContent {
    height: 32px;
    line-height: 32px;
    padding: 0 24px;
    transform: translateX(-50%);
    border-radius: 16px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
  }
  &.bubble {
    width: 320px;
    max-width: 400px;
    line-height: 24px;
    padding: 24px;
    box-sizing: content-box;
    position: fixed;
    border: 1px solid #e5d16c;
    z-index: 888;
    border-radius: 4px;
    color: #666;
    background-color: rgba(250, 241, 182, 0.9);
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    .bubbleCount {
      font-size: 12px;
    }
    .close_icon {
      position: absolute;
      top: 8px;
      right: 8px;
      color: #191919;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #007dff;
      }
    }
  }
  &.isTop {
    top: 130px;
    bottom: initial;
  }
}
.message-fade-enter-active,
.message-fade-leave-active {
  transition: opacity 400ms;
}
.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
}
</style>
