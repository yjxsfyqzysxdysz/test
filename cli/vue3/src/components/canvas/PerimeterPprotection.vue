<template>
  <div class="PerimeterPprotection">
    <canvas id='PerimeterPprotection' :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
export default {
  name: 'PerimeterPprotection',
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
      ctx: null, // canvas画笔
      maxCount: 8 // 最大点击数
    }
  },
  mounted () {
    let c = document.getElementById('PerimeterPprotection')
    this.ctx = c.getContext('2d') // 生成画笔
    this.ctx.strokeStyle = '#F00' // 设置画笔颜色
    this.ctx.lineWidth = 1 // 设置线宽
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
      if (!this.args[0].draw) { // 当绘制结束时，给绘制的第一个线段增加辅助线
        this.drawline(this.args[0].position[0].strX, this.args[0].position[0].strY, this.args[0].position[0].endX, this.args[0].position[0].endY)
      }
    },
    drawline (strX, strY, endX, endY) { // 画辅助线
      /**
       * canvas的坐标轴X轴正常，Y轴则相反
       */
      let ctx = this.ctx
      let quadrant = 1 // 象限
      // 端点与鼠标的中点坐标
      let cx = (strX + endX) / 2
      let cy = (strY + endY) / 2
      // 端点与鼠标连线的角度
      let mainLineAng = this.asin((strY - endY) / Math.sqrt((strY - endY) * (strY - endY) + (strX - endX) * (strX - endX)))
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
      let ax = 30 * this.sin(mainLineAng)
      let ay = 30 * this.cos(mainLineAng)
      ctx.moveTo(cx + ax, cy + ay)
      ctx.lineTo(cx - ax, cy - ay)
      ctx.stroke() // 绘制定义的路径
      // 箭头
      let arr1x, arr1y, arr2x, arr2y
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
      if (this.args[0].direction !== 2) { // 离开
        ctx.moveTo(cx - ax + arr1x, cy - ay + arr1y)
        ctx.lineTo(cx - ax, cy - ay)
        ctx.lineTo(cx - ax + arr2x, cy - ay + arr2y)
        ctx.stroke()
      }
      if (this.args[0].direction !== 1) { // 进入
        ctx.moveTo(cx + ax - arr1x, cy + ay - arr1y)
        ctx.lineTo(cx + ax, cy + ay)
        ctx.lineTo(cx + ax - arr2x, cy + ay - arr2y)
        ctx.stroke()
      }
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
      if (e.which === 1) { // 左键
        if (!this.isDraw || !this.args[0].draw) {
          return
        }
        this.count++
        this.drawing = true
        if (this.count === 1) {
          this.args[0].position[this.count - 1].strX = e.offsetX
          this.args[0].position[this.count - 1].strY = e.offsetY
          this.args[0].position[this.count - 1].endX = e.offsetX
          this.args[0].position[this.count - 1].endY = e.offsetY
        } else {
          this.args[0].position.push({ strX: e.offsetX, strY: e.offsetY, endX: e.offsetX, endY: e.offsetY })
        }
      } else if (e.which > 1) {
        if (this.count >= 3) {
          this.maxCount = this.count
        }
      }
    },
    mousemove (e) { // 鼠标移动时
      if (!this.drawing) {
        return
      }
      if (this.count !== 0 && this.count !== this.maxCount) {
        this.args[0].position[this.count - 1].endX = e.offsetX
        this.args[0].position[this.count - 1].endY = e.offsetY
      }
    },
    mouseup (e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
      if (this.count === this.maxCount) {
        this.args[0].position[this.count - 1].endX = this.args[0].position[0].strX
        this.args[0].position[this.count - 1].endY = this.args[0].position[0].strY
        this.drawing = false
        this.$emit('isDrawRes', this.args[0])
        this.$nextTick(() => {
          if (this.verifyAngle() !== 1) { // 当不符合凸多边形时，提示
            this.$emit('fault')
          }
        })
      }
    },
    verifyAngle () { // 用来验证是否为内凹多边形
      // p：顶点数组(数组对象) n：顶点个数；1：凸集；-1：凹集；0：曲线不符合要求无法计算
      // |=是赋值运算 ||等于本身或赋值
      let j, k, z
      let flag = 0
      let n = this.args[0].position.length
      let p = this.args[0].position
      for (let i = 0; i < n; i++) {
        j = (i + 1) % n
        k = (i + 2) % n
        z = (p[j].strX - p[i].strX) * (p[k].strY - p[j].strY)
        z -= (p[j].strY - p[i].strY) * (p[k].strX - p[j].strX)
        if (z < 0) {
          flag |= 1
        } else if (z > 0) {
          flag |= 2
        }
        if (flag === 3) {
          // console.log('凹多边形，不符合要求')
          return -1
        }
      }
      if (flag !== 0) {
        // console.log('凸多边形')
        return 1
      } else {
        // console.log('曲线不符合要求无法计算')
        return 0
      }
    }
  },
  watch: {
    basicData: {
      handler (val) {
        this.args = [{
          ...JSON.parse(JSON.stringify(val[0]))
        }]
      },
      immediate: true,
      deep: true
    },
    args: {
      handler (val) {
        console.log(JSON.parse(JSON.stringify(val[0].position)))
        this.ctx.clearRect(0, 0, this.Cwidth, this.Cheight)
        for (let i = 0; i < val[0].position.length; i++) {
          this.drawCanvas(
            val[0].position[i].strX,
            val[0].position[i].strY,
            val[0].position[i].endX,
            val[0].position[i].endY
          )
        }
      },
      deep: true
    },
    isDraw (val) { // 判断是否允许绘制
      if (val) {
        if (this.count !== 0) {
          this.count = 0
          this.maxCount = 8
          this.args[0].position = [{ strX: 0, strY: 0, endX: 0, endY: 0 }]
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
