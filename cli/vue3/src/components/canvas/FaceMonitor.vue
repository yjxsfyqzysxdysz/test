<template>
  <div class="FaceMonitor">
    <canvas id='FaceMonitor' :width="Cwidth" :height="Cheight" @mousedown.stop="mousedown($event)" @mouseup.stop="mouseup" @mousemove.stop="mousemove($event)"></canvas>
  </div>
</template>

<script>
/**
 * 本文件使用canvas进行划线操作
 * 为视频报警的划线功能提供基础
 */
let ctx // canvas画笔
export default {
  name: 'FaceMonitor',
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
    faceSizeDraw: { // 人脸尺寸绘制 (19*19)~(100*100) 默认为ipc获取
      type: Number,
      default: 19
    },
    faceSizeDrawToggle: { // 人脸尺寸绘制显示开关
      type: Boolean,
      default: false
    },
    index: { //
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      args: [], // 绘制的线的数据
      drawing: false, // 绘画
      count: 0, // 计数
      mainIndex: 1, // 选中项
      isSelect: false, // 是否选中【人脸尺寸绘制】
      areaColor1: '#FF0000', // 监测区域颜色
      areaColor2: '#0000FF', // 人脸尺寸绘制颜色
      multipleX: 0, // X轴比例
      multipleY: 0 // Y轴比例
    }
  },
  mounted () {
    ctx = document.getElementById('FaceMonitor').getContext('2d') // 生成画笔
    ctx.lineWidth = 1 // 设置线宽
    this.multipleX = parseFloat((1920 / this.Cwidth).toFixed(2))
    this.multipleY = parseFloat((1080 / this.Cheight).toFixed(2))
    // 设置默认由ipc获得的【人脸尺寸绘制】框的默认大小
    this.args[0].position.endX = this.args[0].position.strX + Math.floor(this.faceSizeDraw / this.multipleX * 100) / 100
    this.args[0].position.endY = this.args[0].position.strY + Math.floor(this.faceSizeDraw / this.multipleY * 100) / 100
  },
  methods: {
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
      if (index === 0) {
        ctx.strokeStyle = this.areaColor2 // 设置画笔颜色
      } else {
        ctx.strokeStyle = this.areaColor1 // 设置画笔颜色
      }
      ctx.beginPath() // 起始一条路径，或重置当前路径
      ctx.rect(strX, strY, endX - strX, endY - strY)
      ctx.stroke()
      if (this.isSelect && index === 0) {
        let r = 2
        ctx.beginPath() // 起始一条路径，或重置当前路径
        ctx.fillStyle = this.areaColor2 // 填充的颜色
        ctx.arc(strX, strY, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath() // 起始一条路径，或重置当前路径
        ctx.arc(strX, endY, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath() // 起始一条路径，或重置当前路径
        ctx.arc(endX, strY, r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.beginPath() // 起始一条路径，或重置当前路径
        ctx.arc(endX, endY, r, 0, 2 * Math.PI)
        ctx.fill()
      }
    },
    drawText (x, y, text) { // 绘制文字
      ctx.font = '12px "微软雅黑"' // 设置字体
      ctx.fillStyle = this.areaColor2 // 设置填充颜色
      ctx.textBaseline = 'middle' // 设置字体底线对齐绘制基线
      ctx.textAlign = 'start' // 设置字体对齐的方式
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
        if (this.isDraw && this.args[this.mainIndex].draw) { // 绘制区域
          this.drawing = true
          this.count++
          if (this.count === 1) {
            this.args[this.mainIndex].position.strX = e.offsetX
            this.args[this.mainIndex].position.strY = e.offsetY
            this.args[this.mainIndex].position.endX = e.offsetX
            this.args[this.mainIndex].position.endY = e.offsetY
          }
        }
        if (!this.isDraw) { // 点击显示/隐藏【人脸尺寸框】
          if ((this.args[0].position.strX - e.offsetX) * (this.args[0].position.endX - e.offsetX) <= 0 && (this.args[0].position.strY - e.offsetY) * (this.args[0].position.endY - e.offsetY) <= 0) { // 选中【人脸尺寸绘制】区域内
            if (!this.isSelect) {
              this.mainIndex = 0
              this.isSelect = true
              this.reload(this.args)
            } else {
              if (this.count === 2) {
                this.reload(this.args)
              }
            }
          } else { // 不选中【人脸尺寸绘制】区域外
            if (this.count === 0) {
              this.isSelect = false
              this.reload(this.args)
            }
          }
        }
        if (this.isSelect) { // 改变【人脸尺寸框】的size
          let strX = this.args[0].position.strX
          let strY = this.args[0].position.strY
          let endX = this.args[0].position.endX
          let endY = this.args[0].position.endY
          if (this.count === 0) {
            if (Math.abs(strX - e.offsetX) <= 2 && Math.abs(strY - e.offsetY) <= 2) { // 点中左上角
              this.args[0].position.strX = endX
              this.args[0].position.strY = endY
              this.args[0].position.endX = strX
              this.args[0].position.endY = strY
            } else if (Math.abs(endX - e.offsetX) <= 2 && Math.abs(strY - e.offsetY) <= 2) { // 点中右上角
              this.args[0].position.strX = strX
              this.args[0].position.strY = endY
              this.args[0].position.endX = endX
              this.args[0].position.endY = strY
            } else if (Math.abs(strX - e.offsetX) <= 2 && Math.abs(endY - e.offsetY) <= 2) { // 点中左下角
              this.args[0].position.strX = endX
              this.args[0].position.strY = strY
              this.args[0].position.endX = strX
              this.args[0].position.endY = endY
            } else if (Math.abs(endX - e.offsetX) <= 2 && Math.abs(endY - e.offsetY) <= 2) { // 点中右下角
            } else {
              return
            }
          }
          this.drawing = true
          this.count++
          if (this.count === 1) {
            this.args[this.mainIndex].position.endX = e.offsetX
            this.args[this.mainIndex].position.endY = e.offsetY
          }
        }
      }
    },
    mousemove (e) { // 鼠标移动时
      if (!this.drawing) {
        return
      }
      let _c = this.args[this.mainIndex].position
      if (this.count !== 0 && this.count !== 2) {
        if (!this.isSelect) {
          _c.endX = e.offsetX
          _c.endY = e.offsetY
        } else {
          if (e.offsetX - _c.strX > 100 / this.multipleX) {
            _c.endX = _c.strX + Math.floor(100 / this.multipleX * 100) / 100
          } else if (e.offsetX - _c.strX < -100 / this.multipleX) {
            _c.endX = _c.strX - Math.floor(100 / this.multipleX * 100) / 100
          } else if (e.offsetX - _c.strX > 0 && e.offsetX - _c.strX < 19 / this.multipleX) {
            _c.endX = _c.strX + Math.floor(19 / this.multipleX * 100) / 100
          } else if (e.offsetX - _c.strX < 0 && e.offsetX - _c.strX > -19 / this.multipleX) {
            _c.endX = _c.strX - Math.floor(19 / this.multipleX * 100) / 100
          } else if ((e.offsetX - _c.strX >= 19 / this.multipleX && e.offsetX - _c.strX <= 100 / this.multipleX) || (e.offsetX - _c.strX <= -19 / this.multipleX && e.offsetX - _c.strX >= -100 / this.multipleX)) {
            _c.endX = e.offsetX
          }

          if (e.offsetY - _c.strY > 100 / this.multipleY) {
            _c.endY = _c.strY + Math.floor(100 / this.multipleY * 100) / 100
          } else if (e.offsetY - _c.strY < -100 / this.multipleY) {
            _c.endY = _c.strY - Math.floor(100 / this.multipleY * 100) / 100
          } else if (e.offsetY - _c.strY > 0 && e.offsetY - _c.strY <= 19 / this.multipleY) {
            _c.endY = _c.strY + Math.floor(19 / this.multipleY * 100) / 100
          } else if (e.offsetY - _c.strY < 0 && e.offsetY - _c.strY >= -19 / this.multipleY) {
            _c.endY = _c.strY - Math.floor(19 / this.multipleY * 100) / 100
          } else if ((e.offsetY - _c.strY >= 19 / this.multipleY && e.offsetY - _c.strY <= 100 / this.multipleY) || (e.offsetY - _c.strY <= -19 / this.multipleY && e.offsetY - _c.strY >= -100 / this.multipleY)) {
            _c.endY = e.offsetY
          }
        }
      }
    },
    mouseup (e) { // 鼠标抬起时
      if (!this.drawing) {
        return
      }
      if (this.count === 2) {
        this.drawing = false
        this.$emit('isDrawRes', this.args[this.mainIndex])
      }
    },
    reload (val) { // 重新加载
      ctx.clearRect(0, 0, this.Cwidth, this.Cheight)
      for (let i = 0; i < 2; i++) {
        if (!this.faceSizeDrawToggle && i === 0) {
          continue
        }
        this.drwaRect(
          val[i].position.strX,
          val[i].position.strY,
          val[i].position.endX,
          val[i].position.endY,
          i
        )
        if (i === 0) {
          let x = this.args[0].position.endX - this.args[0].position.strX >= 0 ? this.args[0].position.endX : this.args[0].position.strX
          let y = this.args[0].position.endY - this.args[0].position.strY >= 0 ? this.args[0].position.strY : this.args[0].position.endY
          this.drawText(x + 5, y + 8, 'H:' + this.area.minH.toFixed(0))
          this.drawText(x + 5, y - 8, 'W:' + this.area.minW.toFixed(0))
        }
      }
    }
  },
  watch: {
    basicData: {
      handler (val) {
        this.args = JSON.parse(JSON.stringify(val))
      },
      deep: true,
      immediate: true
    },
    args: {
      handler (val) {
        this.reload(val)
      },
      deep: true
    },
    isDraw (val) { // 判断是否允许绘制
      if (val) {
        this.mainIndex = 1
      }
    },
    faceSizeDrawToggle (val) {
      if (val) {
        this.mainIndex = 0
      } else {
        this.mainIndex = 1
      }
      this.reload(this.args)
    },
    drawing (val) {
      if (!val) {
        this.count = 0
      }
    },
    index (val) {
      this.mainIndex = val
    }
  },
  computed: {
    area () {
      let W = Math.abs(this.args[0].position.strX - this.args[0].position.endX) * this.multipleX
      let H = Math.abs(this.args[0].position.strY - this.args[0].position.endY) * this.multipleY
      return {
        'minW': W,
        'minH': H
      }
    }

  }
}
</script>

<style lang="less" scoped>
</style>
