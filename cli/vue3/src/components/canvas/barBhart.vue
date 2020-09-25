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
      default: '#F00'
    },
    backgroundColor: { // 背景颜色
      type: String,
      default: '#ffffff6e'
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
      default: () => [220, 159, 180]
    },
    scaleMax: {
      type: Number,
      default: 255
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
      this.ctx.beginPath() // 起始一条路径，或重置当前路径
      let position = { x: 0, y: 0 } // 初始位置
      let status = {
        x: {
          main: true,
          direction: 1
        },
        y: {
          main: false,
          direction: 1
        }
      } // 轴状况
      const x = Math.floor(this.Cwidth / len)
      const y = Math.floor(this.Cheight / len)
      switch (this.direction) {
        case 'bottom':
          position.x = 0
          position.y = this.Cheight
          status.x.main = true
          status.x.direction = 1
          status.y.main = false
          status.x.direction = -1
          break
        case 'top':
          position.x = 0
          position.y = 0
          status.x.main = true
          status.x.direction = 1
          status.y.main = false
          status.x.direction = 1
          break
        case 'left':
          position.x = 0
          position.y = 0
          status.x.main = false
          status.x.direction = 1
          status.y.main = true
          status.x.direction = 1
          break
        case 'right':
          position.x = this.Cwidth
          position.y = this.Cheight
          status.x.main = true
          status.x.direction = -1
          status.y.main = false
          status.x.direction = 1
          break
      }
      this.dataBase.forEach(e => {
        if (this.isBackground) {
          this.ctx.strokeStyle = this.backgroundColor // 设置画笔颜色
          this.ctx.moveTo(cx, cy)
          this.ctx.lineTo(subD.x ? this.Cwidth : cx, subD.y ? cy - this.Cheight * subDy : cy)
        }
        this.ctx.strokeStyle = this.strokeColor // 设置画笔颜色
        this.ctx.moveTo(cx, cy)
        this.ctx.lineTo(subD.x ? e.x : cx, subD.y ? cy - e.y * subDy : cy)
        cx += mainD.x * x
        cy += mainD.y * y
      })
      this.ctx.stroke();
    }
  },
  watch: {
    Eangle(val) {
      this.drawCanvas()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
