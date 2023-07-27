<template>
  <div class="revision4" :style="{'background-color': colorInfo.HEX}">
    <div class="left">
      <ul>
        <li v-for="(e,i) of colordata" :key="i" class="item" :style="{'border-top-color': e.HEX, 'color': activeStyle(i)}" @click="activeItem(e, i)">
          <div class="item1">
            <annulusGroup class="circle" :Cwidth="24" :Cheight="120" :radius=[5,12] :padding="6" :Sangle="90" :value="e.CMYK" :annulusColor="strokeStyle(i, e.HEX)"></annulusGroup>
          </div>
          <div class="item2">
            <span :style="{color: e.HEX}">{{e.id}}</span>
            <span class="text">{{e.name}}</span>
          </div>
          <div class="item3">
            <span class="text">{{e.HEX}}</span>
            <barBhart class="barBhart" :Cwidth="12" :Cheight="130" :lineWidth="1" isBackground :barBhartColor="i === activeIndex ? e.HEX : '#fff'" :value="e.RGB"></barBhart>
          </div>
          <div class="item4">
            <span class="text">{{e.english}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="list">
        <ul>
          <li v-for="(e,i) of 'CMYK'" :key="i">
            <p class="altText">{{e}}</p>
            <annulus class="circle" :Cwidth="50" :Cheight="50" :radius="['85%', '100%']" :Sangle="90" :annulusColor="filterTextColor(i)" :value="colorInfo.cmyk[i]" :text="colorInfo.cmyk[i]" :textFontSize="24"></annulus>
          </li>
        </ul>
        <ul>
          <li v-for="(e,i) of 'RGB'" :key="i">
            <p class="altText">{{e}}</p>
            <span class="cont">{{colorInfo.rgb[i]}}</span>
          </li>
          <div class="cont HEXinfo">{{colorInfo.HEX}}</div>
        </ul>
      </div>
      <div class="text">
        <p class="mainText">{{colorInfo.mainText}}</p>
        <p class="subText">{{colorInfo.subText}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import colordata from './colorData.json'
import annulus from '@com/echarts/annulus'
import annulusGroup from '@com/echarts/annulusGroup'
import barBhart from '@com/echarts/barBhart'

export default {
  name: 'revision4',
  components: {
    annulus,
    annulusGroup,
    barBhart
  },
  created() {
    this.colordata = colordata
    this.activeItem = this.$lodash.debounce(this._activeItem, 1e3)
  },
  mounted() {
    let n = this.$lodash.random(0, this.colordata.length - 1, false)
    this._activeItem(this.colordata[n], n)
  },
  data() {
    return {
      colordata: [],
      colorInfo: {
        cmyk: [62, 63, 73, 21],
        rgb: [110, 85, 47],
        HEX: '#6E552F',
        mainText: '煤竹',
        subText: 'SUSUTAKE'
      },
      activeIndex: null
    }
  },
  methods: {
    filterTextColor(index) {
      let color = ''
      switch (index) {
        case 0:
          color = '#0093d3'
          break;
        case 1:
          color = '#cc006b'
          break;
        case 2:
          color = '#fff10c'
          break;
        case 3:
          color = '#000000'
          break;
        default:
          color = '#ffffff'
          break;
      }
      return color
    },
    _activeItem(e, i) { // 选中项
      this.colorInfo.cmyk = e.CMYK
      this.colorInfo.rgb = e.RGB
      this.colorInfo.HEX = e.HEX
      this.colorInfo.mainText = e.name
      this.colorInfo.subText = e.english
      this.activeIndex = i
    },
    activeStyle(i) {
      if (i === this.activeIndex) {
        return this.colordata[i].HEX
      }
      return ''
    },
    strokeStyle(i, HEX) {
      let color = '#FFF'
      if (i === this.activeIndex) {
        color = HEX
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.revision4 {
  .left {
    width: 750px;
    margin-right: 150px;
    color: #fff;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 50px;
        height: 287px;
        flex: none;
        margin: 0 5px 5px;
        cursor: pointer;
        border-top-style: solid;
        border-top-width: 6px;
        position: relative;
        transition: color 1s linear;
        & > div {
          width: 24px;
          height: 120px;
          position: absolute;
          margin-top: 7px;
          span {
            transform: rotate(90deg);
            display: inline-block;
            height: 24px;
            line-height: 24px;
            width: 24px;
            position: absolute;
            font-size: 16px;
          }
        }
        .item1 {
          top: 0;
          left: 0;
        }
        .item2 {
          top: 0;
          right: 0;
          span + span {
            width: 100%;
            height: auto;
            bottom: 0;
            transform: none;
            text-align: center;
          }
        }
        .item3 {
          bottom: 0;
          left: 0;
          height: 145px;
          .barBhart {
            margin-left: 12px;
          }
          .text {
            font-size: 10px;
            height: 10px;
            width: 10px;
            line-height: 10px;
            left: 0;
            top: 0;
          }
        }
        .item4 {
          bottom: 0;
          right: 0;
          height: 145px;
        }
      }
    }
  }
  .right {
    width: 550px;
    position: relative;
    user-select: none;
    .list {
      width: 50px;
      height: 100%;
      position: fixed;
      li {
        border-bottom: 1px solid #ffffff6e;
        .circle {
          margin-bottom: 10px;
        }
      }
      .altText {
        margin: 10px 0 6px 0;
        color: #fff;
      }
      .cont {
        width: 50px;
        height: 50px;
        display: block;
        margin-bottom: 10px;
        text-align: center;
        line-height: 50px;
        font-weight: 300;
        font-size: 24px;
      }
      .HEXinfo {
        color: #fff;
        background-color: #efe8e882;
        margin: 0;
        width: 143px;
        position: absolute;
        border-radius: 8px;
        border-width: 2px;
        border-style: double;
        top: 480px;
        left: 90px;
        box-sizing: content-box;
        opacity: 0;
        transition: all 0.15s linear;
      }
      ul + ul {
        li:first-child {
          border-top: none;
        }
        li .cont {
          height: 30px;
          line-height: 30px;
          text-align: end;
          color: #fff;
        }
        &:hover .HEXinfo {
          opacity: 1;
        }
      }
    }
    .text {
      text-align: center;
      position: fixed;
      color: #fff;
      margin-left: 133px;
      width: 170px;
      .mainText {
        width: 64px;
        font-size: 64px;
        margin: 0 auto;
      }
      .subText {
        padding-top: 24px;
        font-size: 18px;
      }
    }
  }
  ul {
    li {
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
