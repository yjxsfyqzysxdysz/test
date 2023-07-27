<template>
  <span class="imgiconBox">
    <img aria-hidden="true" class="imgicon" :src="loadError ? source[i] : source[0]" :style="iconStyle" :class="svgClass" @click="iconClick" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="handlerError" />
  </span>
</template>

<script>
export default {
  name: 'imgicon',
  props: {
    source: {
      type: String | Array,
      required: true
    },
    className: [String, Array, Object],
    title: [String],
    iconStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      moveFlag: false,
      loadError: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }
  },
  computed: {
    svgClass() {
      let className = this.className
      if (Array.isArray(className)) {
        className = className.join(' ')
      } else if (Object.property.toString.call(className) === '[object Object]') {
        className = Object.values(className).join(' ')
      }
      return className
    },
    deltaDistance() {
      const deltaX = this.endX - this.startX
      const deltaY = this.endY - this.endY
      return Math.sqrt(Math.pow(deltaX, 2), Math.pow(deltaY, 2))
    }
  },
  methods: {
    iconClick(e) {
      this.$emit('click', e)
    },
    touchStart(e) {
      this.moveFlag = false
      this.startX = e.touches[0].clientX
      this.startY = e.touches[0].clientY
    },
    touchMove(e) {
      this.endX = e.touches[0].clientX
      this.endY = e.touches[0].clientY
      if (this.deltaDistance > 10) this.moveFlag = true
    },
    touchEnd(e) {
      if (this.moveFlag) {
        this.moveFlag = false
        return
      }
      this.$emit('iconTouch', e)
      this.moveFlag = false
    },
    handlerError(e) {
      this.loadError = true
      setTimeout(() => {
        this.loadError = false
      }, 3e4)
    }
  }
}
</script>

<style lang="scss" scoped>
.imgiconBox {
  .imgicon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    user-select: none;
  }
}
</style>
