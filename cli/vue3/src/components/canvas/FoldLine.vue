<template>
  <div class="FoldLine">
    <canvas id='FoldLine' :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
export default {
  name: 'FoldLine',
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
    index: { // 所绘制下标—项
      type: Number,
      default: 0
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
      ctx: null, // canvas画笔
      mainIndex: 0 // 绘制窗口的下标
    }
  },
  mounted () {
    let c = document.getElementById('FoldLine')
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
      this.drawline(strX, strY, endX, endY, index)
    },
    drawline (strX, strY, endX, endY, index) { // 画辅助线
      /**
       * canvas的坐标轴X轴正常，Y轴则相反
       */
      let ctx = this.ctx
      let quadrant = 1 // 象限
      // 端点与鼠标的中点坐标
      let cx = (strX + endX) / 2
      let cy = (strY + endY) / 2
      // 端点与鼠标连线的角度
      let mainLineAng = this.asin((strY - endY) / Math.sqrt(Math.pow(strY - endY, 2) + Math.pow(strX - endX, 2)))
      // 配置[0-360)的角度
      if (endX > strX && endY <= strY) { // 1象限[0-90)
        // mainLineAng = mainLineAng
        quadrant = 1
      } else if (endX <= strX && endY < strY) { // 2象限[90-180)
        mainLineAng = 180 - mainLineAng
        quadrant = 2
      } else if (endX < strX && endY >= strY) { // 3象限[180-270)
        mainLineAng = 180 - mainLineAng
        quadrant = 3
      } else if (endX >= strX && endY > strY) { // 4象限[270-360)
        mainLineAng = 360 + mainLineAng
        quadrant = 4
      }
      /* 绘制过mainLine中点的中垂线
       * ax,ay为相对于中中点cx,cy的距离差
       */
      let ax = 80 * this.sin(mainLineAng)
      let ay = 80 * this.cos(mainLineAng)
      ctx.moveTo(cx + ax, cy + ay)
      ctx.lineTo(cx - ax, cy - ay)
      ctx.stroke() // 绘制定义的路径
      // 箭头
      let arr1x, arr1y, arr2x, arr2y, textx, texty
      // 中垂线角度
      if (quadrant === 1) { // 1象限
        arr1x = 10 * this.sin(mainLineAng - 30)
        arr1y = 10 * this.cos(mainLineAng - 30)
        arr2x = 10 * this.cos(90 - mainLineAng - 30)
        arr2y = 10 * this.sin(90 - mainLineAng - 30)
      } else if (quadrant === 2) { // 2象限
        arr1x = 10 * this.sin(mainLineAng - 30)
        arr1y = 10 * this.cos(mainLineAng - 30)
        arr2x = 10 * this.sin(mainLineAng + 30)
        arr2y = 10 * this.cos(-mainLineAng - 30)
      } else if (quadrant === 3) { // 3象限
        arr1x = 10 * this.sin(mainLineAng - 30)
        arr1y = 10 * this.cos(mainLineAng - 30)
        arr2x = 10 * this.cos(90 - mainLineAng - 30)
        arr2y = 10 * this.sin(90 - mainLineAng - 30)
      } else { // 4象限
        arr1x = 10 * this.sin(mainLineAng - 30)
        arr1y = 10 * this.cos(mainLineAng - 30)
        arr2x = 10 * this.sin(mainLineAng + 30)
        arr2y = 10 * this.cos(-mainLineAng - 30)
      }
      textx = 10 * this.sin(mainLineAng)
      texty = 10 * this.cos(mainLineAng)
      if (this.args[index].direction !== 1) { // A处无箭头
        ctx.moveTo(cx - ax + arr1x, cy - ay + arr1y)
        ctx.lineTo(cx - ax, cy - ay)
        ctx.lineTo(cx - ax + arr2x, cy - ay + arr2y)
        ctx.stroke()
      }
      if (this.args[index].direction !== 2) { // B处无箭头
        ctx.moveTo(cx + ax - arr1x, cy + ay - arr1y)
        ctx.lineTo(cx + ax, cy + ay)
        ctx.lineTo(cx + ax - arr2x, cy + ay - arr2y)
        ctx.stroke()
      }
      this.drawText(cx - ax - textx, cy - ay - texty, 'A')
      this.drawText(cx + ax + textx, cy + ay + texty, 'B')
      this.drawText(this.args[index].position.strX, this.args[index].position.strY, this.args[index].tmp)
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
      if (!this.isDraw || !this.args[this.mainIndex].draw) {
        return
      }
      this.count++
      this.drawing = true
      if (this.count === 1) {
        this.args[this.mainIndex].position.strX = e.offsetX
        this.args[this.mainIndex].position.strY = e.offsetY
        this.args[this.mainIndex].position.endX = e.offsetX
        this.args[this.mainIndex].position.endY = e.offsetY
      }
    },
    mousemove (e) { // 鼠标移动时
      if (!this.drawing) {
        return
      }
      if (this.count === 1) {
        this.args[this.mainIndex].position.endX = e.offsetX
        this.args[this.mainIndex].position.endY = e.offsetY
      }
    },
    mouseup (e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
      if (this.count === 2) {
        this.args[this.mainIndex].position.endX = e.offsetX
        this.args[this.mainIndex].position.endY = e.offsetY
        this.drawText(this.args[this.mainIndex].position.strX, this.args[this.mainIndex].position.strY, this.args[this.mainIndex].tmp)
        this.args[this.mainIndex].tmp = this.args[this.mainIndex].label
        this.drawing = false
        this.$emit('isDrawRes', this.args[this.mainIndex])
      }
    }
  },
  watch: {
    basicData: {
      handler (val, oldval) {
        if (val.length > oldval.length) { // add
          this.args.push({
            ...JSON.parse(JSON.stringify(val[val.length - 1])),
            tmp: ''
          })
        } else if (val.length < oldval.length) { // delete
          if (!val.length) { // 如果只有一个
            this.args.splice(0, 1)
            return
          }
          for (let i = 0; i < val.length; i++) {
            if (val[i].value !== oldval[i].value) { // 删除复数个中的除最后一个中的任意一个
              this.args.splice(i, 1)
              return
            }
          }
          this.args.splice(-1, 1) // 删除复数个中的最后一个
        } else {
          if (val[this.mainIndex].draw) {
            this.count = 0
            this.args[this.mainIndex].tmp = ''
            this.args[this.mainIndex].draw = val[this.mainIndex].draw
            this.args[this.mainIndex].direction = val[this.mainIndex].direction
            this.args[this.mainIndex].position = {
              ...JSON.parse(JSON.stringify(val[this.mainIndex].position))
            }
          } else {
            this.args[this.mainIndex].direction = val[this.mainIndex].direction
          }
        }
      },
      deep: true
    },
    args: {
      handler (val) {
        this.ctx.clearRect(0, 0, this.Cwidth, this.Cheight)
        for (let i = 0; i < val.length; i++) {
          this.drawCanvas(
            val[i].position.strX,
            val[i].position.strY,
            val[i].position.endX,
            val[i].position.endY,
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
    },
    index (val) {
      this.mainIndex = val
      // console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
