<template>
  <div class="annulus" :style="{width:`${Cwidth}px`,height:`${Cheight}px`}">
    <canvas ref="annulus" :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>

  </div>
</template>

<script>
export default {
  name: 'annulus',
  props: {
    Cwidth: { // 宽
      type: Number,
      default: 480
    },
    Cheight: { // 高
      type: Number,
      default: 270
    },
    isDraw: { // 能否绘画
      type: Boolean,
      default: false
    },
    direction: { // 方向 false - 顺时针; true - 逆时针
      type: Boolean,
      default: false
    },
    strokeStyle: { // 画笔颜色
      type: String,
      default: '#F00'
    },
    lineWidth: { // 设置线宽
      type: [String, Number],
      default: 1
    },
    centerCircle: { //圆心
      type: Object,
      default: () => {
        return {
          cx: 0, cy: 0
        }
      }
    },
    radius: { // 半径
      type: [Number, String],
      default: 10
    },
    Sangle: { // 角度 开始
      type: [Number, String],
      default: 0
    },
    Eangle: { // 角度 结束
      type: [Number, String],
      default: 360
    }
  },
  data() {
    return {
      args: [], // 绘制的线的数据
      drawing: false, // 绘画
      ctx: null // canvas画笔
    }
  },
  mounted() {
    let c = this.$refs.annulus
    this.ctx = c.getContext('2d') // 生成画笔
    this.ctx.strokeStyle = this.strokeStyle // 设置画笔颜色
    this.ctx.lineWidth = this.lineWidth // 设置线宽
    this.drawCanvas()
  },
  methods: {
    angle2radian(val) { // 角度-弧度
      val = Number(val)
      return (val / 180 * Math.PI)
    },
    drawCanvas() { // 使用canvas的画笔
      this.ctx.beginPath() // 起始一条路径，或重置当前路径
      this.ctx.arc(this.centerCircle.cx, this.centerCircle.cy, this.radius, this.angle2radian(this.Sangle - 90), this.angle2radian(this.Eangle - 90), this.direction)
      this.ctx.stroke();
    },
    drawText(x, y, text) { // 绘制文字
      let ctx = this.ctx
      ctx.fillStyle = 'red' // 设置填充颜色为紫色
      ctx.font = '14px "微软雅黑"' // 设置字体
      ctx.textBaseline = 'middle' // 设置字体底线对齐绘制基线
      ctx.textAlign = 'center' // 设置字体对齐的方式
      ctx.fillText(text, x, y) // 填充文字
    },
    mousedown(e) { // 鼠标按下时
      if (!this.isDraw || !this.args[0].draw) {
        return
      }
      if (e.which === 1) {
        this.drawing = true
      }
    },
    mousemove(e) { // 鼠标移动时
      if (!this.drawing) {
        return
      }
    },
    mouseup(e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
    }
  },
  watch: {
    Eangle(val) {
      this.drawCanvas()
    }
  },
}
</script>

<style lang="less" scoped>
</style>
