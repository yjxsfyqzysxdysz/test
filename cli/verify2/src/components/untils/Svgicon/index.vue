<template>
  <span class="svgIconBox" :title="title">
    <svg ref="svgIcon" aria-hidden="true" class="svg-icon" :class="svgClass" :style="iconStyle" @click="iconClick" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @error="handlerError">
      <use :xlink:href="iconName"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'svgIconBox',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String | Array | Object,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    iconStyle: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.getIcon(this.iconClass)
  },
  computed: {
    iconName() {
      return '#icon-' + this.iconClass
    },
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
  data() {
    return {
      moveFlag: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
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
    touchMovr(e) {
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
    getIcon(icon) {
      require(`@/assets/icon/svg/${icon}.svg`)
    }
  },
  watch: {
    iconName(val) {
      this.getIcon(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .svgIconBox .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    user-select: none;
  }
</style>
