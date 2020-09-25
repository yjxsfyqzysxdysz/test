<template>
  <div class="WanderingMonitoring">
    <canvas id='WanderingMonitoring' :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
export default {
  name: 'WanderingMonitoring',
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
      count: 0, // 计数
      ctx: null, // canvas画笔
      maxCount: 8 // 最大点击数
    }
  },
  mounted () {
    let c = document.getElementById('WanderingMonitoring')
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
