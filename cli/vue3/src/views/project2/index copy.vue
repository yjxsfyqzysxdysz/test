<template>
  <div class="project2 clearFloat">
    <div class="left floatLift">
      <ul class="">
        <li v-for="(e,i) of colordata" :key="i" class="" :style="{'border-top-color': e.HEX}">
          <div>
            <div v-for="(f,j) of e.CMYK" :key="j">
              <annulus class="canvas" :Cwidth="24" :Cheight="24" :lineWidth="7" strokeStyle="#ffffff6e" :centerCircle="{cx:12,cy:12}" radius="9"></annulus>
              <annulus class="canvas" :Cwidth="24" :Cheight="24" :lineWidth="7" strokeStyle="#fff" :centerCircle="{cx:12,cy:12}" radius="9" :Eangle="f*3.6"></annulus>
            </div>
          </div>
          <div>
            <span :style="{color: e.HEX}">{{filterNum(i + 1)}}</span>
            <span class="text">{{e.name}}</span>
          </div>
          <div>
            <barBhart :Cwidth="20" :Cheight="110" lineWidth="3" isBackground direction="top"></barBhart>
          </div>
          <div><span class="text">{{e.english}}</span></div>
        </li>
      </ul>
    </div>
    <div class="right floatRight">
      <div class="list">
        <ul>
          <li v-for="(e,i) of list" :key="i">
            <p class="altText">{{e}}</p>
            <span class="cont" :style="{color: filterCanvasColor(i)}">22</span>
            <annulus v-if="i<4" class="canvas" :Cwidth="50" :Cheight="50" :lineWidth="3" strokeStyle="#ffffff6e" :centerCircle="{cx:25,cy:25}" radius="23"></annulus>
            <annulus v-if="i<4" class="canvas" :Cwidth="50" :Cheight="50" :lineWidth="3" :strokeStyle="filterCanvasColor(i)" :centerCircle="{cx:25,cy:25}" radius="23" :Eangle="0"></annulus>
          </li>
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
  name: 'project2',
  components: {
    annulus,
    barBhart
  },
  created() {
    this.colordata = colordata
  },
  data() {
    return {
      colordata: [],
      colorInfo: {
        cmyk: [],
        rgb: [],
        HEX: '',
        mainText: '紅梅',
        subText: 'KOHBAI'
      },
      list: ['C', 'M', 'Y', 'K', 'R', 'G', 'B']
    }
  },
  methods: {
    filterCanvasColor(index) {
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
    filterNum(index) {
      return this.$lodash.padStart(index + '', 3, '0')
    }
  }
}
</script>

<style lang="less" scoped>
.project2 {
  // height: 100%;
  width: 1000px;
  margin: 40px auto 0;
  background: gold;
  .left {
    width: 400px;
    background: green;
    color: #fff;
    ul {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 50px;
        height: 287px;
        border-top-style: solid;
        border-top-width: 5px;
        position: relative;
        overflow: hidden;
        flex: none;
        margin: 0 5px 5px;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        & > div {
          flex: none;
          width: 24px;
          height: 112px;
          position: relative;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-top: 7px;
          span {
            transform: translateX(-50%) rotate(90deg);
            display: inline-block;
            height: 22px;
            line-height: 22px;
            width: 28px;
            position: absolute;
            top: 10px;
            left: 12px;
            background: black;
          }
          span + span {
            top: unset;
            bottom: 28px;
            width: 78px;
            text-align: end;
          }
          & > div {
            position: relative;
            flex: none;
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
  .right {
    width: 550px;
    position: relative;
    .list {
      width: 50px;
      height: 100%;
      li {
        border-bottom: 1px solid #ffffff6e;
        position: relative;
        overflow: hidden;
        &:first-child {
          border-top: 1px solid #ffffff6e;
        }
        &:nth-child(4) ~ li .cont {
          height: 30px;
          line-height: 30px;
          text-align: end;
          color: #fff;
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
      .canvas {
        top: 34px;
      }
    }
    .text {
      text-align: center;
      position: absolute;
      top: 50px;
      right: 170px;
      transform: translateX(-50%);
      color: #fff;
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
.canvas {
  position: absolute;
}
</style>