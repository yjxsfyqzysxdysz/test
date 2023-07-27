<template>
  <div class="revision1" :style="{'background-color': colorInfo.HEX}">
    <div class="left">
      <ul>
        <li v-for="(e,i) of colordata" :key="i" class="item" :class="[`item-${padStartNum(i+1)}`]" @click="activeItem(e, i)">
          <p class="item-head"></p>
          <p class="item-content item-content1"></p>
          <p class="item-content item-content2" :style="{'background-color': activeStyle(i)}"></p>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="list">
        <ul>
          <li v-for="(e,i) of 'CMYK'" :key="i">
            <p class="altText">{{e}}</p>
            <span class="cont" :style="{color: filterTextColor(i)}">{{colorInfo.cmyk[i]}}</span>
            <i class="circleBg"></i>
            <i class="circleBg circle-l"><s :style="cmykAngle(i, 1)"></s></i>
            <i class="circleBg circle-r"><s :style="cmykAngle(i, 0)"></s></i>
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
import { padStartNum } from '@/tools/utils'

export default {
  name: 'revision1',
  created() {
    this.colordata = colordata
    this.activeItem = this.$lodash.debounce(this._activeItem, 1e3)
  },
  mounted() {
    // 添加 鼠标移入效果
    // this.colordata.forEach((e, i) => {
    //   document.styleSheets[0].addRule(`.project2 .left ul .item.item${this.padStartNum(i + 1)}:hover .itemcontent2`, `background-color: ${e.HEX};`)
    // })
    let n = this.$lodash.random(0, this.colordata.length - 1, false)
    this._activeItem(this.colordata[n], n)
  },
  data() {
    return {
      colordata: [],
      colorInfo: {
        cmyk: [],
        rgb: [],
        HEX: '',
        mainText: '',
        subText: ''
      },
      activeIndex: null,
      tmp: [0, 0, 0, 0]
    }
  },
  methods: {
    padStartNum(index) {
      return padStartNum(index)
    },
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
    activeStyle(i) {
      if (i === this.activeIndex) {
        return this.colordata[i].HEX
      }
      return ''
    },
    _activeItem(e, i) { // 选中项
      this.colorInfo.cmyk = e.CMYK
      this.colorInfo.rgb = e.RGB
      this.colorInfo.HEX = e.HEX
      this.colorInfo.mainText = e.name
      this.colorInfo.subText = e.english
      this.activeIndex = i
    },
    cmykAngle(index, direction) { // cmyk角度
      if (!this.colorInfo.cmyk.length) return
      let res = ''
      if (direction) { // 左
        res = `transform: rotate(${Math.max(this.colorInfo.cmyk[index] - 50, 0) * 3.6 - 180}deg);`
        if ((this.colorInfo.cmyk[index] + this.tmp[index]) > 50 && this.colorInfo.cmyk[index] > this.tmp[index]) {
          res += 'transition-delay: 0.5s;'
        }
      } else { // 右
        res = `transform: rotate(${Math.min(this.colorInfo.cmyk[index], 50) * 3.6 + 180}deg);`
        if ((this.colorInfo.cmyk[index] + this.tmp[index]) > 50 && this.colorInfo.cmyk[index] < this.tmp[index]) {
          res += 'transition-delay: 0.5s;'
        }
        this.tmp[index] = this.colorInfo.cmyk[index]
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./common.scss";
.revision1 {
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
        position: relative;
        overflow: hidden;
        flex: none;
        margin: 0 5px 5px;
        cursor: pointer;
        &-head {
          height: 40px;
          background-repeat: no-repeat;
          background-image: url(../../assets/projectImg/project2/col_num.png);
        }
        &-content {
          height: 278px;
          width: 100%;
          position: absolute;
          top: 0px;
        }
        &-content1 {
          background-image: url(../../assets/projectImg/project2/col_bg.png);
          background-repeat: no-repeat;
        }
        &-content2 {
          background-color: #fff;
          transition: background-color 0.15s linear;
          mask-image: url(../../assets/projectImg/project2/col.png);
          mask-repeat: no-repeat;
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
        position: relative;
        overflow: hidden;
        &:first-child {
          border-top: 1px solid #ffffff6e;
        }
        .circleBg {
          position: absolute;
          bottom: 10px;
          display: block;
          width: 50px;
          height: 50px;
          background-image: url(../../assets/projectImg/project2/circle.png);
          background-repeat: no-repeat;
        }
        .circle-l,
        .circle-r {
          mask-repeat: no-repeat;
          mask-image: url(../../assets/projectImg/project2/circle_h.png);
          s {
            display: block;
            width: 50px;
            height: 50px;
            background-image: url(../../assets/projectImg/project2/colorBox.png);
            background-repeat: no-repeat;
            transition: transform 0.5s linear;
            transform: rotate(180deg);
          }
        }
        .circle-r {
          transform: rotate(180deg);
        }
        &:nth-child(2) s {
          background-position: 0 -50px;
        }
        &:nth-child(3) s {
          background-position: 0 -100px;
        }
        &:nth-child(4) s {
          background-position: 0 -150px;
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
}
</style>
