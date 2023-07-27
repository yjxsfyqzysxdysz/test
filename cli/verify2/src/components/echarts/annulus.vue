<template>
  <div :ref="ref" class="annulus" :style="{width:`${Cwidth}px`,height:`${Cheight}px`}"></div>
</template>

<script>
export default {
  name: "eacharts-annulus",
  props: {
    Cwidth: { // 宽
      type: Number,
      default: 480
    },
    Cheight: { // 高
      type: Number,
      default: 270
    },
    radius: { // 半径
      type: Array,
      default: () => ['40%', '55%']
    },
    Sangle: { // 角度 开始
      type: Number,
      default: 0
    },
    annulusColor: { // 环颜色
      type: String,
      default: ''
    },
    backGroundColor: { // 背景环颜色
      type: String,
      default: '#FFFFFF6E'
    },
    value: { // 环的参数
      type: [String, Number],
      default: 0
    },
    text: { // 文字信息
      type: [String, Number],
      default: ''
    },
    textFontSize: {
      type: Number,
      default: 16
    }
  },
  data() {
    return {
      ref: Symbol('annulus')
    }
  },
  computed: {
    annulusValue: function() { // 环的参数
      if (isFinite(this.value)) {
        return +this.value
      }
      return 0
    },
    backValue: function() { // 背景环的参数
      return 100 - this.annulusValue
    }
  },
  mounted() {
    this.createChart()
  },
  methods: {
    initChart(ref, option = {}) {
      const myChart = this.$echarts.init(ref)
      myChart.setOption(option)
    },
    createChart() {
      let option = {
        series: [
          {
            type: 'pie',
            startAngle: this.Sangle,
            radius: this.radius,
            hoverAnimation: false,
            stillShowZeroSum: false,
            label: {
              show: false
            },
            data: [
              {
                value: this.annulusValue,
                itemStyle: {
                  color: this.annulusColor
                }
              },
              {
                value: this.backValue,
                itemStyle: {
                  color: this.backGroundColor
                },
                emphasis: {
                  itemStyle: {
                    color: this.backGroundColor
                  }
                }
              }
            ]
          }
        ]
      }
      if (this.text !== '' || this.text !== null || this.text !== undefined) {
        option['title'] = {
          text: this.text,
          textStyle: {
            color: this.annulusColor,
            fontSize: this.textFontSize,
            fontWeight: 'normal',
            align: 'center'
          },
          left: 'center',
          top: '12'
        }
      }
      this.initChart(this.$refs[this.ref], option)
    }
  },
  watch: {
    annulusValue(val) {
      setTimeout(() => {
        this.createChart()
      }, 0)
    }
  },
}
</script>

<style lang="scss" scoped>
.annulus {
}
</style>