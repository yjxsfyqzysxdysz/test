<template>
  <div :ref="ref" class="barBhart" :style="{width:`${Cwidth}px`,height:`${Cheight}px`}"></div>
</template>

<script>
export default {
  name: 'echarts-barBhart',
  props: {
    Cwidth: { // 宽
      type: Number,
      default: 480
    },
    Cheight: { // 高
      type: Number,
      default: 270
    },
    barBhartColor: { // 柱颜色
      type: String,
      default: '#FFF'
    },
    backgroundColor: { // 背景颜色
      type: String,
      default: '#FFFFFF6E'
    },
    lineWidth: { // 设置线宽
      type: [String, Number],
      default: 'auto'
    },
    isBackground: { // 是否启用背景
      type: Boolean,
      default: false
    },
    direction: { // 起始边
      type: String,
      default: 'bottom'
    },
    value: { // data
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ref: Symbol('barBhart')
    }
  },
  mounted() {
    setTimeout(() => {
      this.createChart()
    }, 0)
  },
  methods: {
    initChart(ref, option = {}) {
      const myChart = this.$echarts.init(ref)
      myChart.setOption(option)
    },
    createChart() {
      let option = {
        xAxis: {
          show: false,
          type: 'category'
        },
        yAxis: {
          show: false,
          inverse: true,
          max: 255,
          min: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
        series: [{
          data: this.value,
          type: 'bar',
          barWidth: this.lineWidth,
          showBackground: this.isBackground,
          backgroundStyle: {
            color: this.backgroundColor
          }
        }],
        color: [this.barBhartColor]
      }
      this.initChart(this.$refs[this.ref], option)
    }
  },
  watch: {
    barBhartColor(val) {
      setTimeout(() => {
        this.createChart()
      }, 0)
    }
  },
}
</script>

<style lang="scss" scoped>
.barBhart {
}
</style>