<template>
  <div class="barBhart" :style="{width:`${Cwidth}px`,height:`${Cheight}px`}">
    <canvas ref="barBhart" :width="Cwidth" :height="Cheight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'barBhart',
  props: {
    Cwidth: { // 宽
      type: Number,
      default: 480
    },
    Cheight: { // 高
      type: Number,
      default: 270
    },
    strokeColor: { // 画笔颜色
      type: String,
      default: '#FFF'
    },
    backgroundColor: { // 背景颜色
      type: String,
      default: '#FFFFFF6E'
    },
    lineWidth: { // 设置线宽
      type: [String, Number],
      default: 1
    },
    isBackground: { // 是否启用背景
      type: Boolean,
      default: false
    },
    direction: { // 起始边
      type: String,
      default: 'bottom'
    },
    dataBase: { // data
      type: Array,
      default: () => []
    },
    dataMax: { // 基础数据最大值
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      ctx: null // canvas画笔
    }
  },
  mounted() {
    let c = this.$refs.barBhart
    this.ctx = c.getContext('2d') // 生成画笔
    this.ctx.lineWidth = this.lineWidth // 设置线宽
    this.drawCanvas()
  },
  methods: {
    drawCanvas() { // 使用canvas的画笔
      const len = this.dataBase.length
      if (!len) return
      const step = {
        x: Math.floor(this.Cwidth / (len)),
        y: Math.floor(this.Cheight / (len))
      }
      const length = {
        x: this.Cwidth,
        y: this.Cheight
      }
      let axis = { main: '', sub: '' } // 轴
      let symbol = { x: 1, y: 1 } // 正负
      switch (this.direction) {
        case 'top':
          axis.main = 'x'
          axis.sub = 'y'
          symbol[axis.main] = 1
          symbol[axis.sub] = -1
          break
        case 'bottom':
          axis.main = 'x'
          axis.sub = 'y'
          symbol[axis.main] = 1
          symbol[axis.sub] = 1
          break
        case 'right':
          axis.main = 'y'
          axis.sub = 'x'
          symbol[axis.main] = 1
          symbol[axis.sub] = 1
          break
        case 'left':
          axis.main = 'y'
          axis.sub = 'x'
          symbol[axis.main] = 1
          symbol[axis.sub] = -1
          break
      }
      let position = { x: 0, y: 0 }
      this.dataBase.forEach(e => {
        // 初始化
        position[axis.main] += step[axis.main]
        position[axis.sub] = symbol[axis.sub] > 0 ? 0 : length[axis.sub]
        // 开始绘制
        this.ctx.strokeStyle = this.strokeColor
        this.ctx.beginPath() // 起始一条路径，或重置当前路径
        this.ctx.moveTo(position.x, position.y)
        // 子轴改变
        position[axis.sub] += symbol[axis.sub] * length[axis.sub] * this.setRatio(e)
        this.ctx.lineTo(position.x, position.y)
        this.ctx.stroke()
        if (this.isBackground) {
          this.ctx.strokeStyle = this.backgroundColor
          this.ctx.beginPath() // 起始一条路径，或重置当前路径
          this.ctx.moveTo(position.x, position.y)
          position[axis.sub] = symbol[axis.sub] > 0 ? length[axis.sub] : 0
          this.ctx.lineTo(position.x, position.y)
          this.ctx.stroke()
        }
      })
    },
    setRatio(val) {
      val = Number.isInteger(val) ? +val : 0
      return val / this.dataMax
    }
  },
  watch: {
    strokeColor(val) {
      this.ctx.clearRect(0, 0, this.Cwidth, this.Cheight) // 清除画布
      this.drawCanvas()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
