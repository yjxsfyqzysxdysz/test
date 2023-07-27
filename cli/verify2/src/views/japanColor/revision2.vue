<template>
  <div class="revision2" :style="{'background-color': colorInfo.HEX}">
    <div class="left">
      <ul>
        <li v-for="(e,i) of colordata" :key="i" class="item" :style="{'border-top-color': e.HEX, 'color': activeStyle(i)}" @click="activeItem(e, i)">
          <div class="item1">
            <annulus v-for="f of 8" :key="f" :class="[`circleBg${Math.ceil(f / 2)}`]" class="circleBg" :Cwidth="24" :Cheight="24" :lineWidth="7" :strokeStyle="strokeStyle(i, f, e.HEX)" :centerCircle="{cx:12,cy:12}" radius="9" :Eangle="f % 2 ? 360 : e.CMYK[f / 2 - 1] * 3.6"></annulus>
          </div>
          <div class="item2">
            <span :style="{color: e.HEX}">{{e.id}}</span>
            <span class="text">{{e.name}}</span></div>
          <div class="item3">
            <span class="text">{{e.HEX}}</span>
            <barBhart class="barBhart" :Cwidth="13" :Cheight="130" lineWidth="1" isBackground direction="bottom" :dataBase="e.RGB" :dataMax="255" :strokeColor="i === activeIndex ? e.HEX : '#fff'"></barBhart>
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
            <span class="cont" :style="{color: filterTextColor(i)}">{{colorInfo.cmyk[i]}}</span>
            <annulus class="circleBg" :Cwidth="50" :Cheight="50" :lineWidth="3" strokeStyle="#ffffff6e" :centerCircle="{cx:25,cy:25}" radius="23"></annulus>
            <annulus class="circleBg" :Cwidth="50" :Cheight="50" :lineWidth="3" :strokeStyle="filterTextColor(i)" :centerCircle="{cx:25,cy:25}" radius="23" :Eangle="colorInfo.cmyk[i] * 3.6" :animation="40"></annulus>
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
import annulus from '@com/canvas/annulus'
import barBhart from '@com/canvas/barBhart'

export default {
  name: 'revision2',
  components: {
    annulus,
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
        HEX: '',
        mainText: '',
        subText: ''
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
    strokeStyle(i, j, HEX) {
      let color = '#FFF'
      if (j % 2) {
        color = '#FFFFFF6E'
      } else if (i === this.activeIndex) {
        color = HEX
      }
      return color
    }
  }
}
</script>

<style lang="scss" scoped>
.revision2 {
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
          .circleBg1 {
            top: 0;
          }
          .circleBg2 {
            top: 32px;
          }
          .circleBg3 {
            top: 64px;
          }
          .circleBg4 {
            top: 96px;
          }
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
        .circleBg {
          bottom: 10px;
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
      .circleBg {
        position: absolute;
      }
    }
  }
  .barBhart {
    position: absolute;
    right: 0;
  }
}
</style>