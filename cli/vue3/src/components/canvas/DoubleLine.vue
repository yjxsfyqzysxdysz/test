<template>
  <div class="DoubleLine">
    <canvas id='DoubleLine' :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
export default {
  name: 'DoubleLine',
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
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      args: [], // 绘制的线的数据
      drawing: false, // 绘画
      count: 0, // 计数
      ctx: null // canvas画笔
    }
  },
  mounted () {
    let c = document.getElementById('DoubleLine')
    this.ctx = c.getContext('2d') // 生成画笔
    this.ctx.strokeStyle = '#F00' // 设置画笔颜色
    this.ctx.lineWidth = 1 // 设置线宽
  },
  methods: {
    drawCanvas (strX, strY, endX, endY, index) { // 使用canvas的画笔
      if (strX === undefined) {
        strX = 0
      } else if (strY === undefined) {
        strY = 0
      } else if (endX === undefined) {
        endX = 0
      } else if (endY === undefined) {
        endY = 0
      }
      this.ctx.beginPath() // 起始一条路径，或重置当前路径
      this.ctx.moveTo(strX, strY) // 线条的开始坐标
      this.ctx.lineTo(endX, endY) // 线条的结束坐标
      this.ctx.stroke() // 绘制定义的路径
      let text = ''
      if (index === 0) {
        text = 'A'
      } else if (index === 1) {
        text = 'B'
      }
      this.drawText(this.args[0].position[index].strX, this.args[0].position[index].strY, text)
      if (index === 1) {
        this.drawline(strX, strY, endX, endY)
      }
    },
    drawline (strX, strY, endX, endY) { // 画辅助线
      /**
       * canvas的坐标轴X轴正常，Y轴则相反
       */
      let ctx = this.ctx
      // 中点坐标
      let c1, c2
      c1 = {
        x: (this.args[0].position[0].endX + this.args[0].position[0].strX) / 2,
        y: (this.args[0].position[0].endY + this.args[0].position[0].strY) / 2
      }
      c2 = {
        x: (this.args[0].position[1].endX + this.args[0].position[1].strX) / 2,
        y: (this.args[0].position[1].endY + this.args[0].position[1].strY) / 2
      }
      // 绘制辅助线
      ctx.setLineDash([5, 5]) // 绘制虚线
      ctx.beginPath() // 起始一条路径，或重置当前路径
      ctx.moveTo(c1.x, c1.y)
      ctx.lineTo(c2.x, c2.y)
      ctx.stroke() // 绘制定义的路径
      ctx.setLineDash([])
      // 辅助线角度
      let mainLineAng = this.asin((c1.y - c2.y) / Math.sqrt(Math.pow(c1.y - c2.y, 2) + Math.pow(c1.x - c2.x, 2)))
      // 象限
      // 配置[0-360)的角度
      if (c2.x > c1.x && c2.y <= c1.y) { // 1象限[0-90)
        // mainLineAng = mainLineAng
      } else if (c2.x <= c1.x && c2.y < c1.y) { // 2象限[90-180)
        mainLineAng = 180 - mainLineAng
      } else if (c2.x < c1.x && c2.y >= c1.y) { // 3象限[180-270)
        mainLineAng = 180 - mainLineAng
      } else if (c2.x >= c1.x && c2.y > c1.y) { // 4象限[270-360)
        // mainLineAng = 360 + mainLineAng
      }
      // 箭头坐标
      let arr1x, arr1y, arr2x, arr2y
      // 与辅助线角度
      arr1x = 10 * this.cos(mainLineAng + 30)
      arr1y = 10 * this.sin(mainLineAng + 30)
      arr2x = 10 * this.cos(mainLineAng - 30)
      arr2y = 10 * this.sin(mainLineAng - 30)
      // 绘制箭头
      ctx.beginPath() // 起始一条路径，或重置当前路径
      if (this.direction !== 1) {
        ctx.moveTo(c1.x + arr1x, c1.y - arr1y) // A->B
        ctx.lineTo(c1.x, c1.y)
        ctx.lineTo(c1.x + arr2x, c1.y - arr2y)
        ctx.stroke()
      }
      if (this.direction !== 2) {
        ctx.moveTo(c2.x - arr1x, c2.y + arr1y) // B->A
        ctx.lineTo(c2.x, c2.y)
        ctx.lineTo(c2.x - arr2x, c2.y + arr2y)
        ctx.stroke()
      }
    },
    drawText (x, y, text) { // 绘制文字
      let ctx = this.ctx
      ctx.fillStyle = 'red' // 设置填充颜色为紫色
      ctx.font = '14px "微软雅黑"' // 设置字体
      ctx.textBaseline = 'middle' // 设置字体底线对齐绘制基线
      ctx.textAlign = 'center' // 设置字体对齐的方式
      ctx.fillText(text, x, y) // 填充文字
    },
    sin (val) { // 正弦函数 val为角度α
      return Math.sin(val * Math.PI / 180)
    },
    cos (val) { // 余弦函数 val为角度α
      return Math.cos(val * Math.PI / 180)
    },
    asin (val) { // 反正弦函数 val为sinα值，返回角度α
      return Math.asin(val) * 180 / Math.PI
    },
    acos (val) { // 反余弦函数 val为cosα值，返回角度α
      return Math.acos(val) * 180 / Math.PI
    },
    mousedown (e) { // 鼠标按下时
      if (!this.isDraw || !this.args[0].draw) {
        return
      }
      if (e.which === 1) {
        this.count++
        this.drawing = true
        if (this.count === 1) {
          this.args[0].position[0].strX = e.offsetX
          this.args[0].position[0].strY = e.offsetY
          this.args[0].position[0].endX = e.offsetX
          this.args[0].position[0].endY = e.offsetY
        } else if (this.count === 3) {
          this.args[0].position.push({ strX: e.offsetX, strY: e.offsetY, endX: e.offsetX, endY: e.offsetY })
        }
      }
    },
    mousemove (e) { // 鼠标移动时
      if (!this.drawing) {
        return
      }
      if (this.count % 2 === 1) {
        this.args[0].position[4 % this.count].endX = e.offsetX
        this.args[0].position[4 % this.count].endY = e.offsetY
      }
    },
    mouseup (e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
      if (this.count === 4) {
        this.drawing = false
        this.$emit('isDrawRes', this.args[0])
      }
    }
  },
  watch: {
    basicData: {
      handler (val) {
        if (val[0].draw) {
          this.args = [
            ...JSON.parse(JSON.stringify(val))
          ]
        } else {
          this.args[0].direction = val[0].direction
        }
      },
      deep: true,
      immediate: true
    },
    args: {
      handler (val) {
        this.ctx.clearRect(0, 0, this.Cwidth, this.Cheight)
        for (let i = 0; i < val[0].position.length; i++) {
          this.drawCanvas(
            val[0].position[i].strX,
            val[0].position[i].strY,
            val[0].position[i].endX,
            val[0].position[i].endY,
            i
          )
        }
      },
      deep: true
    },
    isDraw (val) { // 判断是否允许绘制
      if (val) {
        this.count = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
