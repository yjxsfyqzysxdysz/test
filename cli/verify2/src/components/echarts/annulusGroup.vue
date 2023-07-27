<template>
  <div :ref="ref" class="annulusGroup" :style="{width:`${Cwidth}px`,height:`${Cheight}px`}"></div>
</template>

<script>
export default {
  name: "eacharts-annulusGroup",
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
    padding: { // 间距
      type: Number,
      default: 0
    },
    Sangle: { // 角度 开始
      type: Number,
      default: 0
    },
    annulusColor: { // 环颜色
      type: String,
      default: '#FFF'
    },
    backGroundColor: { // 背景环颜色
      type: String,
      default: '#FFFFFF6E'
    },
    value: { // 环的参数
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      ref: Symbol('annulusGroup')
    }
  },
  mounted() {
    setTimeout(() => {
      this.createChart()
    }, 0);
  },
  methods: {
    initChart(ref, option = {}) {
      const myChart = this.$echarts.init(ref)
      myChart.setOption(option)
    },
    createChart() {
      let option = {
        series: []
      }
      this.value.forEach((e, i) => {
        option.series.push({
          type: 'pie',
          startAngle: this.Sangle,
          radius: this.radius,
          hoverAnimation: false,
          stillShowZeroSum: false,
          center: ['50%', this.radius[1] * (2 * i + 1) + i * this.padding],
          label: {
            show: false
          },
          data: [
            {
              value: isFinite(e) ? e : 0,
              itemStyle: {
                color: this.annulusColor
              }
            },
            {
              value: 100 - (isFinite(e) ? e : 0),
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
        })
      })
      this.initChart(this.$refs[this.ref], option)
    }
  },
  watch: {
    annulusColor(val) {
      setTimeout(() => {
        this.createChart()
      }, 0)
    }
  },
}
</script>

<style lang="scss" scoped>
.annulusGroup {
}
</style>