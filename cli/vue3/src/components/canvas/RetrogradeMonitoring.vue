<template>
  <div class="RetrogradeMonitoring">
    <canvas id='RetrogradeMonitoring' :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
export default {
  name: 'RetrogradeMonitoring',
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
    }
  },
  data () {
    return {
      args: [], // 绘制的线的数据
      drawing: false, // 绘画
      ctx: null, // canvas画笔
      count: 0 // 点击次数
    }
  },
  mounted () {
    let c = document.getElementById('RetrogradeMonitoring')
    this.ctx = c.getContext('2d') // 生成画笔
    this.ctx.strokeStyle = '#F00' // 设置画笔颜色
    this.ctx.lineWidth = 2 // 设置线宽
  },
  methods: {
    drawCanvas (strX, strY, endX, endY) { // 使用canvas的画笔
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
      this.drawline(strX, strY, endX, endY)
    },
    drawline (strX, strY, endX, endY) { // 画辅助线
      /**
       * canvas的坐标轴X轴正常，Y轴则相反
       */
      let ctx = this.ctx
      // 辅助线角度
      let mainLineAng = this.asin((strY - endY) / Math.sqrt(Math.pow(strY - endY, 2) + Math.pow(strX - endX, 2)))
      // 象限
      // 配置[0-360)的角度
      if (endX > strX && endY <= strY) { // 1象限[0-90)
        // mainLineAng = mainLineAng
      } else if (endX <= strX && endY < strY) { // 2象限[90-180)
        mainLineAng = 180 - mainLineAng
      } else if (endX < strX && endY >= strY) { // 3象限[180-270)
        mainLineAng = 180 - mainLineAng
      } else if (endX >= strX && endY > strY) { // 4象限[270-360)
        mainLineAng = 360 + mainLineAng
      }
      // 箭头坐标
      let arr1x, arr1y, arr2x, arr2y
      // 与辅助线角度
      arr1x = 30 * this.cos(mainLineAng + 30)
      arr1y = 30 * this.sin(mainLineAng + 30)
      arr2x = 30 * this.cos(mainLineAng - 30)
      arr2y = 30 * this.sin(mainLineAng - 30)
      // 绘制箭头
      ctx.moveTo(endX - arr1x, endY + arr1y)
      ctx.lineTo(endX, endY)
      ctx.lineTo(endX - arr2x, endY + arr2y)
      ctx.stroke()
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
        if (this.count === 1) {
          this.drawing = true
          this.args[0].position.strX = e.offsetX
          this.args[0].position.strY = e.offsetY
          this.args[0].position.endX = e.offsetX
          this.args[0].position.endY = e.offsetY
        }
      }
    },
    mousemove (e) { // 鼠标移动时
      if (!this.drawing) {
        return
      }
      this.args[0].position.endX = e.offsetX
      this.args[0].position.endY = e.offsetY
    },
    mouseup (e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
      if (this.count === 2) {
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
        }
      },
      deep: true,
      immediate: true
    },
    args: {
      handler (val) {
        this.ctx.clearRect(0, 0, this.Cwidth, this.Cheight)
        this.drawCanvas(
          val[0].position.strX,
          val[0].position.strY,
          val[0].position.endX,
          val[0].position.endY
        )
      },
      deep: true
    },
    isDraw (val) {
      if (val) {
        this.count = 0
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
