<template>
  <div class="annulus" :style="{width:`${Cwidth}px`,height:`${Cheight}px`}">
    <svg id="mysvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
      <circle id="mycircle" cx="400" cy="300" r="50" />
    </svg>
    <!-- <canvas id="annulus" :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas> -->

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
    basicData: { // 获得的基础数据
      type: Array,
      default: () => { return [] }
    },
    direction: { // 方向
      type: String,
      default: 'clockwise' // clockwise - 顺时针; anticlockwise - 逆时针
    },
    color: { // 颜色
      type: [String, Number],
      default: '#F00'
    },
    lineWidth: { // 设置线宽
      type: Number,
      default: 1
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
    // let c = document.getElementById('annulus')
    // this.ctx = c.getContext('2d') // 生成画笔
    // this.ctx.strokeStyle = this.color // 设置画笔颜色
    // this.ctx.fillStyle = '#FF0000'
    // this.ctx.lineWidth = this.lineWidth // 设置线宽
    // this.drawCanvas()
  },
  methods: {
    drawCanvas() { // 使用canvas的画笔
      this.ctx.beginPath() // 起始一条路径，或重置当前路径
      this.ctx.arc(25, 25, 24, 0, Math.PI * 2, false)
      // this.ctx.closePath()
      this.ctx.stroke();
      // this.ctx.fill()
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
}
</script>

<style lang="scss" scoped>
.annulus {
}
</style>
