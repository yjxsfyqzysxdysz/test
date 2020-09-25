<template>
  <div class="ItemsLeftBehind">
    <canvas id='ItemsLeftBehind' :width="Cwidth" :height="Cheight" @mousedown="mousedown($event)" @mouseup="mouseup" @mousemove="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
export default {
  name: 'ItemsLeftBehind',
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
    drawSize: { // 是否绘制大、小【目标尺寸】
      type: Number,
      default: 0
    },
    index: { // 所绘制下标—项
      type: Number,
      default: 0
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
      maxCount: 8, // 最大点击数
      ctx: null, // canvas画笔
      mainIndex: 0 // 绘制窗口的下标
    }
  },
  mounted () {
    let c = document.getElementById('ItemsLeftBehind')
    this.ctx = c.getContext('2d') // 生成画笔
    this.ctx.strokeStyle = '#F00' // 设置画笔颜色
    this.ctx.lineWidth = 1 // 设置线宽
  },
  methods: {
    drawCanvas (strX, strY, endX, endY, index) { // 绘制线段
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
      this.drawText(this.args[index].position[0].strX, this.args[index].position[0].strY, this.args[index].tmp)
    },
    drwaRect (strX, strY, endX, endY, index) { // 绘制矩形
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
      this.ctx.rect(strX, strY, endX - strX, endY - strY)
      this.ctx.stroke()
      this.drawText(this.args[index].position[0].strX, this.args[index].position[0].strY, this.args[index].tmp)
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
      if (e.which === 1) { // 左键
        if (!this.isDraw || !this.args[this.mainIndex].draw) {
          return
        }
        this.count++
        this.drawing = true
        if (this.count === 1) {
          this.args[this.mainIndex].position[this.count - 1].strX = e.offsetX
          this.args[this.mainIndex].position[this.count - 1].strY = e.offsetY
          this.args[this.mainIndex].position[this.count - 1].endX = e.offsetX
          this.args[this.mainIndex].position[this.count - 1].endY = e.offsetY
        } else {
          this.args[this.mainIndex].position.push({ strX: e.offsetX, strY: e.offsetY, endX: e.offsetX, endY: e.offsetY })
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
        this.args[this.mainIndex].position[this.count - 1].endX = e.offsetX
        this.args[this.mainIndex].position[this.count - 1].endY = e.offsetY
      }
    },
    mouseup (e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
      if (this.count === this.maxCount) {
        this.args[this.mainIndex].position[this.count - 1].endX = this.args[this.mainIndex].position[0].strX
        this.args[this.mainIndex].position[this.count - 1].endY = this.args[this.mainIndex].position[0].strY
        if (this.mainIndex < 2) {
          this.args[this.mainIndex].position.splice(1, 1)
        }
        this.drawText(this.args[this.mainIndex].position[0].strX, this.args[this.mainIndex].position[0].strY, this.args[this.mainIndex].tmp)
        this.args[this.mainIndex].tmp = this.args[this.mainIndex].label
        this.drawing = false
        this.$emit('isDrawRes', this.args[this.mainIndex])
        this.$nextTick(() => {
          if (this.mainIndex > 1) { // 当不符合凸多边形时，提示
            if (this.verifyAngle() !== 1) {
              this.$emit('fault', 1)
            }
          } else {
            if (this.verifyArea() === 0) { // 当大尺寸比小尺寸小，提示
              this.$emit('fault', 2)
            }
          }
        })
      }
    },
    verifyAngle () { // 用来验证是否为内凹多边形
      // p：顶点数组(数组对象) n：顶点个数；1：凸集；-1：凹集；0：曲线不符合要求无法计算
      // |=是赋值运算 ||等于本身或赋值
      let j, k, z
      let flag = 0
      let n = this.args[this.mainIndex].position.length
      let p = this.args[this.mainIndex].position
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
    },
    verifyArea () { // 用来验证大尺寸是否比小尺寸大
      let bigArea, smallArea
      this.args.map(e => {
        if (e.value === 10) {
          if (e.position.length === 1) {
            bigArea = undefined
            return bigArea
          }
          let l1 = Math.sqrt(Math.pow(e.position[0].endX - e.position[0].strX, 2) + Math.pow(e.position[0].endY - e.position[0].strY, 2))
          let l2 = Math.sqrt(Math.pow(e.position[1].endX - e.position[1].strX, 2) + Math.pow(e.position[1].endY - e.position[1].strY, 2))
          bigArea = l1 * l2 / 2
        }
        if (e.value === 11) {
          if (e.position.length === 1) {
            smallArea = undefined
            return smallArea
          }
          let l1 = Math.sqrt(Math.pow(e.position[0].endX - e.position[0].strX, 2) + Math.pow(e.position[0].endY - e.position[0].strY, 2))
          let l2 = Math.sqrt(Math.pow(e.position[1].endX - e.position[1].strX, 2) + Math.pow(e.position[1].endY - e.position[1].strY, 2))
          smallArea = l1 * l2 / 2
        }
      })
      if (bigArea === undefined || smallArea === undefined) {
        return -1 // 只绘制了一个尺寸 或 没有绘制
      } else if (bigArea >= smallArea) {
        return 1 // 大尺寸比小尺寸大
      } else {
        return 0 // 大尺寸比小尺寸小
      }
    }
  },
  watch: {
    basicData: {
      handler (val, oldval) {
        if (oldval !== undefined) { // 非初始化时
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
            if (val[this.mainIndex].draw) { // 清空时
              this.args[this.mainIndex].tmp = ''
              this.args[this.mainIndex].draw = val[this.mainIndex].draw
              this.args[this.mainIndex].position = [
                ...JSON.parse(JSON.stringify(val[this.mainIndex].position))
              ]
            }
          }
        } else { // 初始化时
          for (let item of val) {
            this.args.push({
              ...JSON.parse(JSON.stringify(item)),
              tmp: ''
            })
          }
        }
      },
      deep: true,
      immediate: true
    },
    args: {
      handler (val) {
        this.ctx.clearRect(0, 0, this.Cwidth, this.Cheight)
        for (let i = 0; i < val.length; i++) {
          if (val[i].value < 10) {
            for (let j = 0; j < val[i].position.length; j++) {
              this.drawCanvas(
                val[i].position[j].strX,
                val[i].position[j].strY,
                val[i].position[j].endX,
                val[i].position[j].endY,
                i
              )
            }
          } else {
            this.drwaRect(
              val[i].position[0].strX,
              val[i].position[0].strY,
              val[i].position[0].endX,
              val[i].position[0].endY,
              i
            )
          }
        }
      },
      deep: true
    },
    isDraw (val) { // 判断是否允许绘制
      if (val) {
        if (this.count !== 0) {
          this.count = 0
          if (this.mainIndex > 1) {
            if (this.drawSize > 1) {
              this.maxCount = 8
            } else {
              this.maxCount = 2
            }
          }
        }
      }
    },
    drawSize: {
      handler (val) {
        if (val > 1) { // 正常绘制时
          this.maxCount = 8
        } else { // 绘制大、小窗口时
          this.maxCount = 2
        }
        this.mainIndex = val
      },
      immediate: true
    },
    index (val) {
      this.mainIndex = val
    }
  }
}
</script>

<style lang="less" scoped>
</style>
