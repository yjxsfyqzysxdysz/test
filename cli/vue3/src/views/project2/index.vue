<template>
  <div class="project2" :style="{'background-color': colorInfo.HEX}">
    <div class="left">
      <ul>
        <li v-for="(e,i) of colordata" :key="i" class="item" :class="[`item${filterNum(i+1)}`]" @click="activeItem(e, i)">
          <p class="itemhead"></p>
          <p class="itemcontent itemcontent1"></p>
          <p class="itemcontent itemcontent2" :style="{'background-color': activeStyle(i)}"></p>
        </li>
      </ul>
    </div>
    <div class="right">
      <div class="list">
        <ul>
          <li v-for="(e,i) of 'CMYK'" :key="i">
            <p class="altText">{{e}}</p>
            <span class="cont" :style="{color: filterCanvasColor(i)}">{{colorInfo.cmyk[i]}}</span>
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

export default {
  name: 'project2',
  created() {
    this.colordata = colordata
    this.activeItem = this.$lodash.debounce(this._activeItem, 1e3)
  },
  mounted() {
    colordata.forEach((e, i) => {
      document.styleSheets[0].addRule(`.project2 .left ul .item.item${this.filterNum(i + 1)}:hover .itemcontent2`, `background-color: ${e.HEX};`)
    })
    let n = this.$lodash.random(0, colordata.length - 1, false)
    this._activeItem(colordata[n], n)
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
        return colordata[i].HEX
      }
      return ''
    },
    cmykAngle(index, direction) { // cmyk角度
      if (!this.colorInfo.cmyk.length) return
      let res = ''
      if (direction) { // 左
        res += `transform: rotate(${Math.max(this.colorInfo.cmyk[index] - 50, 0) * 1.8 - 180}deg);`
        if ((this.colorInfo.cmyk[index] + this.tmp[index]) > 50 && this.colorInfo.cmyk[index] > this.tmp[index]) {
          res += 'transition-delay: 0.5s;'
        }
      } else { // 右
        res += `transform: rotate(${Math.min(this.colorInfo.cmyk[index], 50) * 3.6 + 180}deg);`
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

<style lang="less" scoped>
.project2 {
  transition: background-color 1s linear;
  display: flex;
  justify-content: center;
  padding: 40px;
  .left {
    width: 400px;
    margin-right: 150px;
    color: #fff;
    ul {
      display: flex;
      width: 400px;
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
        .itemhead {
          height: 40px;
          background-repeat: no-repeat;
          background-image: url(../../assets/projectImg/project2/col_num.png);
        }
        .itemcontent {
          height: 278px;
          width: 100%;
          position: absolute;
          top: 0px;
        }
        .itemcontent1 {
          background-image: url(../../assets/projectImg/project2/col_bg.png);
          background-repeat: no-repeat;
        }
        .itemcontent2 {
          background-color: #fff;
          transition: background-color 0.15s linear;
          -webkit-mask-image: url(../../assets/projectImg/project2/col.png);
          -webkit-mask-repeat: no-repeat;
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
        }
        .circleBg {
          background-image: url(../../assets/projectImg/project2/circle.png);
          background-repeat: no-repeat;
        }
        .circle-l,
        .circle-r {
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-image: url(../../assets/projectImg/project2/circle_h.png);
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
      .canvas {
        top: 34px;
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
.canvas {
  position: absolute;
}
.item001,
.item008,
.item015,
.item022,
.item029,
.item036,
.item043,
.item050,
.item057,
.item064,
.item071,
.item078,
.item085,
.item092,
.item099,
.item106,
.item113,
.item120,
.item127,
.item134,
.item141,
.item148,
.item155,
.item162,
.item169,
.item176,
.item183,
.item190,
.item197,
.item204,
.item211,
.item218,
.item225,
.item232,
.item239,
.item246 {
  .itemhead {
    left: 10px;
  }
}
.item002,
.item009,
.item016,
.item023,
.item030,
.item037,
.item044,
.item051,
.item058,
.item065,
.item072,
.item079,
.item086,
.item093,
.item100,
.item107,
.item114,
.item121,
.item128,
.item135,
.item142,
.item149,
.item156,
.item163,
.item170,
.item177,
.item184,
.item191,
.item198,
.item205,
.item212,
.item219,
.item226,
.item233,
.item240,
.item247 {
  .itemhead {
    left: 76px;
  }
}
.item003,
.item010,
.item017,
.item024,
.item031,
.item038,
.item045,
.item052,
.item059,
.item066,
.item073,
.item080,
.item087,
.item094,
.item101,
.item108,
.item115,
.item122,
.item129,
.item136,
.item143,
.item150,
.item157,
.item164,
.item171,
.item178,
.item185,
.item192,
.item199,
.item206,
.item213,
.item220,
.item227,
.item234,
.item241,
.item248 {
  .itemhead {
    left: 142px;
  }
}
.item004,
.item011,
.item018,
.item025,
.item032,
.item039,
.item046,
.item053,
.item060,
.item067,
.item074,
.item081,
.item088,
.item095,
.item102,
.item109,
.item116,
.item123,
.item130,
.item137,
.item144,
.item151,
.item158,
.item165,
.item172,
.item179,
.item186,
.item193,
.item200,
.item207,
.item214,
.item221,
.item228,
.item235,
.item242,
.item249 {
  .itemhead {
    left: 208px;
  }
}
.item005,
.item012,
.item019,
.item026,
.item033,
.item040,
.item047,
.item054,
.item061,
.item068,
.item075,
.item082,
.item089,
.item096,
.item103,
.item110,
.item117,
.item124,
.item131,
.item138,
.item145,
.item152,
.item159,
.item166,
.item173,
.item180,
.item187,
.item194,
.item201,
.item208,
.item215,
.item222,
.item229,
.item236,
.item243,
.item250 {
  .itemhead {
    left: 274px;
  }
}
.item006,
.item013,
.item020,
.item027,
.item034,
.item041,
.item048,
.item055,
.item062,
.item069,
.item076,
.item083,
.item090,
.item097,
.item104,
.item111,
.item118,
.item125,
.item132,
.item139,
.item146,
.item153,
.item160,
.item167,
.item174,
.item181,
.item188,
.item195,
.item202,
.item209,
.item216,
.item223,
.item230,
.item237,
.item244 {
  .itemhead {
    left: 340px;
  }
}
.item007,
.item014,
.item021,
.item028,
.item035,
.item042,
.item049,
.item056,
.item063,
.item070,
.item077,
.item084,
.item091,
.item098,
.item105,
.item112,
.item119,
.item126,
.item133,
.item140,
.item147,
.item154,
.item161,
.item168,
.item175,
.item182,
.item189,
.item196,
.item203,
.item210,
.item217,
.item224,
.item231,
.item238,
.item245 {
  .itemhead {
    left: 406px;
  }
}
.item001,
.item002,
.item003,
.item004,
.item005,
.item006,
.item007 {
  .itemhead {
    top: 40px;
  }
}
.item008,
.item009,
.item010,
.item011,
.item012,
.item013,
.item014 {
  .itemhead {
    top: 342px;
  }
}
.item015,
.item016,
.item017,
.item018,
.item019,
.item020,
.item021 {
  .itemhead {
    top: 644px;
  }
}
.item022,
.item023,
.item024,
.item025,
.item026,
.item027,
.item028 {
  .itemhead {
    top: 946px;
  }
}
.item029,
.item030,
.item031,
.item032,
.item033,
.item034,
.item035 {
  .itemhead {
    top: 1248px;
  }
}
.item036,
.item037,
.item038,
.item039,
.item040,
.item041,
.item042 {
  .itemhead {
    top: 1550px;
  }
}
.item043,
.item044,
.item045,
.item046,
.item047,
.item048,
.item049 {
  .itemhead {
    top: 1852px;
  }
}
.item050,
.item051,
.item052,
.item053,
.item054,
.item055,
.item056 {
  .itemhead {
    top: 2154px;
  }
}
.item057,
.item058,
.item059,
.item060,
.item061,
.item062,
.item063 {
  .itemhead {
    top: 2456px;
  }
}
.item064,
.item065,
.item066,
.item067,
.item068,
.item069,
.item070 {
  .itemhead {
    top: 2758px;
  }
}
.item071,
.item072,
.item073,
.item074,
.item075,
.item076,
.item077 {
  .itemhead {
    top: 3060px;
  }
}
.item078,
.item079,
.item080,
.item081,
.item082,
.item083,
.item084 {
  .itemhead {
    top: 3362px;
  }
}
.item085,
.item086,
.item087,
.item088,
.item089,
.item090,
.item091 {
  .itemhead {
    top: 3664px;
  }
}
.item092,
.item093,
.item094,
.item095,
.item096,
.item097,
.item098 {
  .itemhead {
    top: 3966px;
  }
}
.item099,
.item100,
.item101,
.item102,
.item103,
.item104,
.item105 {
  .itemhead {
    top: 4268px;
  }
}
.item106,
.item107,
.item108,
.item109,
.item110,
.item111,
.item112 {
  .itemhead {
    top: 4570px;
  }
}
.item113,
.item114,
.item115,
.item116,
.item117,
.item118,
.item119 {
  .itemhead {
    top: 4872px;
  }
}
.item120,
.item121,
.item122,
.item123,
.item124,
.item125,
.item126 {
  .itemhead {
    top: 5174px;
  }
}
.item127,
.item128,
.item129,
.item130,
.item131,
.item132,
.item133 {
  .itemhead {
    top: 5476px;
  }
}
.item134,
.item135,
.item136,
.item137,
.item138,
.item139,
.item140 {
  .itemhead {
    top: 5778px;
  }
}
.item141,
.item142,
.item143,
.item144,
.item145,
.item146,
.item147 {
  .itemhead {
    top: 6080px;
  }
}
.item148,
.item149,
.item150,
.item151,
.item152,
.item153,
.item154 {
  .itemhead {
    top: 6382px;
  }
}
.item155,
.item156,
.item157,
.item158,
.item159,
.item160,
.item161 {
  .itemhead {
    top: 6684px;
  }
}
.item162,
.item163,
.item164,
.item165,
.item166,
.item167,
.item168 {
  .itemhead {
    top: 6986px;
  }
}
.item169,
.item170,
.item171,
.item172,
.item173,
.item174,
.item175 {
  .itemhead {
    top: 7288px;
  }
}
.item176,
.item177,
.item178,
.item179,
.item180,
.item181,
.item182 {
  .itemhead {
    top: 7590px;
  }
}
.item183,
.item184,
.item185,
.item186,
.item187,
.item188,
.item189 {
  .itemhead {
    top: 7892px;
  }
}
.item190,
.item191,
.item192,
.item193,
.item194,
.item195,
.item196 {
  .itemhead {
    top: 8194px;
  }
}
.item197,
.item198,
.item199,
.item200,
.item201,
.item202,
.item203 {
  .itemhead {
    top: 8496px;
  }
}
.item204,
.item205,
.item206,
.item207,
.item208,
.item209,
.item210 {
  .itemhead {
    top: 8798px;
  }
}
.item211,
.item212,
.item213,
.item214,
.item215,
.item216,
.item217 {
  .itemhead {
    top: 9100px;
  }
}
.item218,
.item219,
.item220,
.item221,
.item222,
.item223,
.item224 {
  .itemhead {
    top: 9402px;
  }
}
.item225,
.item226,
.item227,
.item228,
.item229,
.item230,
.item231 {
  .itemhead {
    top: 9704px;
  }
}
.item232,
.item233,
.item234,
.item235,
.item236,
.item237,
.item238 {
  .itemhead {
    top: 10006px;
  }
}
.item239,
.item240,
.item241,
.item242,
.item243,
.item244,
.item245 {
  .itemhead {
    top: 10308px;
  }
}
.item246,
.item247,
.item248,
.item249,
.item250 {
  .itemhead {
    top: 10610px;
  }
}
.item001 {
  .itemhead {
    background-position: 0px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px 0px;
  }
}
.item002 {
  .itemhead {
    background-position: -50px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px 0px;
  }
}
.item003 {
  .itemhead {
    background-position: -100px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px 0px;
  }
}
.item004 {
  .itemhead {
    background-position: -150px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px 0px;
  }
}
.item005 {
  .itemhead {
    background-position: -200px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px 0px;
  }
}
.item006 {
  .itemhead {
    background-position: -250px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px 0px;
  }
}
.item007 {
  .itemhead {
    background-position: -300px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px 0px;
  }
}
.item008 {
  .itemhead {
    background-position: -350px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px 0px;
  }
}
.item009 {
  .itemhead {
    background-position: -400px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px 0px;
  }
}
.item010 {
  .itemhead {
    background-position: -450px 0px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px 0px;
  }
}
.item011 {
  .itemhead {
    background-position: 0px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px 0px;
  }
}
.item012 {
  .itemhead {
    background-position: -50px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px 0px;
  }
}
.item013 {
  .itemhead {
    background-position: -100px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px 0px;
  }
}
.item014 {
  .itemhead {
    background-position: -150px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px 0px;
  }
}
.item015 {
  .itemhead {
    background-position: -200px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px 0px;
  }
}
.item016 {
  .itemhead {
    background-position: -250px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px 0px;
  }
}
.item017 {
  .itemhead {
    background-position: -300px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px 0px;
  }
}
.item018 {
  .itemhead {
    background-position: -350px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px 0px;
  }
}
.item019 {
  .itemhead {
    background-position: -400px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px 0px;
  }
}
.item020 {
  .itemhead {
    background-position: -450px -40px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px 0px;
  }
}
.item021 {
  .itemhead {
    background-position: 0px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -278px;
  }
}
.item022 {
  .itemhead {
    background-position: -50px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -278px;
  }
}
.item023 {
  .itemhead {
    background-position: -100px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -278px;
  }
}
.item024 {
  .itemhead {
    background-position: -150px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -278px;
  }
}
.item025 {
  .itemhead {
    background-position: -200px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -278px;
  }
}
.item026 {
  .itemhead {
    background-position: -250px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -278px;
  }
}
.item027 {
  .itemhead {
    background-position: -300px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -278px;
  }
}
.item028 {
  .itemhead {
    background-position: -350px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -278px;
  }
}
.item029 {
  .itemhead {
    background-position: -400px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -278px;
  }
}
.item030 {
  .itemhead {
    background-position: -450px -80px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -278px;
  }
}
.item031 {
  .itemhead {
    background-position: 0px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -278px;
  }
}
.item032 {
  .itemhead {
    background-position: -50px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -278px;
  }
}
.item033 {
  .itemhead {
    background-position: -100px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -278px;
  }
}
.item034 {
  .itemhead {
    background-position: -150px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -278px;
  }
}
.item035 {
  .itemhead {
    background-position: -200px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -278px;
  }
}
.item036 {
  .itemhead {
    background-position: -250px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -278px;
  }
}
.item037 {
  .itemhead {
    background-position: -300px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -278px;
  }
}
.item038 {
  .itemhead {
    background-position: -350px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -278px;
  }
}
.item039 {
  .itemhead {
    background-position: -400px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -278px;
  }
}
.item040 {
  .itemhead {
    background-position: -450px -120px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -278px;
  }
}
.item041 {
  .itemhead {
    background-position: 0px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -556px;
  }
}
.item042 {
  .itemhead {
    background-position: -50px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -556px;
  }
}
.item043 {
  .itemhead {
    background-position: -100px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -556px;
  }
}
.item044 {
  .itemhead {
    background-position: -150px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -556px;
  }
}
.item045 {
  .itemhead {
    background-position: -200px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -556px;
  }
}
.item046 {
  .itemhead {
    background-position: -250px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -556px;
  }
}
.item047 {
  .itemhead {
    background-position: -300px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -556px;
  }
}
.item048 {
  .itemhead {
    background-position: -350px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -556px;
  }
}
.item049 {
  .itemhead {
    background-position: -400px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -556px;
  }
}
.item050 {
  .itemhead {
    background-position: -450px -160px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -556px;
  }
}
.item051 {
  .itemhead {
    background-position: 0px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -556px;
  }
}
.item052 {
  .itemhead {
    background-position: -50px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -556px;
  }
}
.item053 {
  .itemhead {
    background-position: -100px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -556px;
  }
}
.item054 {
  .itemhead {
    background-position: -150px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -556px;
  }
}
.item055 {
  .itemhead {
    background-position: -200px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -556px;
  }
}
.item056 {
  .itemhead {
    background-position: -250px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -556px;
  }
}
.item057 {
  .itemhead {
    background-position: -300px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -556px;
  }
}
.item058 {
  .itemhead {
    background-position: -350px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -556px;
  }
}
.item059 {
  .itemhead {
    background-position: -400px -200px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -556px;
  }
}
.item060 {
  .itemhead {
    background-position: -450px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -556px;
  }
}
.item061 {
  .itemhead {
    background-position: 0px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -834px;
  }
}
.item062 {
  .itemhead {
    background-position: -50px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -834px;
  }
}
.item063 {
  .itemhead {
    background-position: -100px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -834px;
  }
}
.item064 {
  .itemhead {
    background-position: -150px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -834px;
  }
}
.item065 {
  .itemhead {
    background-position: -200px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -834px;
  }
}
.item066 {
  .itemhead {
    background-position: -250px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -834px;
  }
}
.item067 {
  .itemhead {
    background-position: -300px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -834px;
  }
}
.item068 {
  .itemhead {
    background-position: -350px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -834px;
  }
}
.item069 {
  .itemhead {
    background-position: -400px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -834px;
  }
}
.item070 {
  .itemhead {
    background-position: -450px -240px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -834px;
  }
}
.item071 {
  .itemhead {
    background-position: 0px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -834px;
  }
}
.item072 {
  .itemhead {
    background-position: -50px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -834px;
  }
}
.item073 {
  .itemhead {
    background-position: -100px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -834px;
  }
}
.item074 {
  .itemhead {
    background-position: -150px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -834px;
  }
}
.item075 {
  .itemhead {
    background-position: -200px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -834px;
  }
}
.item076 {
  .itemhead {
    background-position: -250px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -834px;
  }
}
.item077 {
  .itemhead {
    background-position: -300px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -834px;
  }
}
.item078 {
  .itemhead {
    background-position: -350px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -834px;
  }
}
.item079 {
  .itemhead {
    background-position: -400px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -834px;
  }
}
.item080 {
  .itemhead {
    background-position: -450px -280px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -834px;
  }
}
.item081 {
  .itemhead {
    background-position: 0px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -1112px;
  }
}
.item082 {
  .itemhead {
    background-position: -50px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -1112px;
  }
}
.item083 {
  .itemhead {
    background-position: -100px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -1112px;
  }
}
.item084 {
  .itemhead {
    background-position: -150px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -1112px;
  }
}
.item085 {
  .itemhead {
    background-position: -200px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -1112px;
  }
}
.item086 {
  .itemhead {
    background-position: -250px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -1112px;
  }
}
.item087 {
  .itemhead {
    background-position: -300px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -1112px;
  }
}
.item088 {
  .itemhead {
    background-position: -350px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -1112px;
  }
}
.item089 {
  .itemhead {
    background-position: -400px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -1112px;
  }
}
.item090 {
  .itemhead {
    background-position: -450px -320px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -1112px;
  }
}
.item091 {
  .itemhead {
    background-position: 0px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -1112px;
  }
}
.item092 {
  .itemhead {
    background-position: -50px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -1112px;
  }
}
.item093 {
  .itemhead {
    background-position: -100px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -1112px;
  }
}
.item094 {
  .itemhead {
    background-position: -150px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -1112px;
  }
}
.item095 {
  .itemhead {
    background-position: -200px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -1112px;
  }
}
.item096 {
  .itemhead {
    background-position: -250px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -1112px;
  }
}
.item097 {
  .itemhead {
    background-position: -300px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -1112px;
  }
}
.item098 {
  .itemhead {
    background-position: -350px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -1112px;
  }
}
.item099 {
  .itemhead {
    background-position: -400px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -1112px;
  }
}
.item100 {
  .itemhead {
    background-position: -450px -360px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -1112px;
  }
}
.item101 {
  .itemhead {
    background-position: 0px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -1390px;
  }
}
.item102 {
  .itemhead {
    background-position: -50px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -1390px;
  }
}
.item103 {
  .itemhead {
    background-position: -100px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -1390px;
  }
}
.item104 {
  .itemhead {
    background-position: -150px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -1390px;
  }
}
.item105 {
  .itemhead {
    background-position: -200px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -1390px;
  }
}
.item106 {
  .itemhead {
    background-position: -250px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -1390px;
  }
}
.item107 {
  .itemhead {
    background-position: -300px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -1390px;
  }
}
.item108 {
  .itemhead {
    background-position: -350px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -1390px;
  }
}
.item109 {
  .itemhead {
    background-position: -400px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -1390px;
  }
}
.item110 {
  .itemhead {
    background-position: -450px -400px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -1390px;
  }
}
.item111 {
  .itemhead {
    background-position: 0px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -1390px;
  }
}
.item112 {
  .itemhead {
    background-position: -50px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -1390px;
  }
}
.item113 {
  .itemhead {
    background-position: -100px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -1390px;
  }
}
.item114 {
  .itemhead {
    background-position: -150px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -1390px;
  }
}
.item115 {
  .itemhead {
    background-position: -200px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -1390px;
  }
}
.item116 {
  .itemhead {
    background-position: -250px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -1390px;
  }
}
.item117 {
  .itemhead {
    background-position: -300px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -1390px;
  }
}
.item118 {
  .itemhead {
    background-position: -350px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -1390px;
  }
}
.item119 {
  .itemhead {
    background-position: -400px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -1390px;
  }
}
.item120 {
  .itemhead {
    background-position: -450px -440px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -1390px;
  }
}
.item121 {
  .itemhead {
    background-position: 0px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -1668px;
  }
}
.item122 {
  .itemhead {
    background-position: -50px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -1668px;
  }
}
.item123 {
  .itemhead {
    background-position: -100px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -1668px;
  }
}
.item124 {
  .itemhead {
    background-position: -150px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -1668px;
  }
}
.item125 {
  .itemhead {
    background-position: -200px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -1668px;
  }
}
.item126 {
  .itemhead {
    background-position: -250px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -1668px;
  }
}
.item127 {
  .itemhead {
    background-position: -300px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -1668px;
  }
}
.item128 {
  .itemhead {
    background-position: -350px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -1668px;
  }
}
.item129 {
  .itemhead {
    background-position: -400px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -1668px;
  }
}
.item130 {
  .itemhead {
    background-position: -450px -480px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -1668px;
  }
}
.item131 {
  .itemhead {
    background-position: 0px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -1668px;
  }
}
.item132 {
  .itemhead {
    background-position: -50px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -1668px;
  }
}
.item133 {
  .itemhead {
    background-position: -100px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -1668px;
  }
}
.item134 {
  .itemhead {
    background-position: -150px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -1668px;
  }
}
.item135 {
  .itemhead {
    background-position: -200px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -1668px;
  }
}
.item136 {
  .itemhead {
    background-position: -250px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -1668px;
  }
}
.item137 {
  .itemhead {
    background-position: -300px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -1668px;
  }
}
.item138 {
  .itemhead {
    background-position: -350px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -1668px;
  }
}
.item139 {
  .itemhead {
    background-position: -400px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -1668px;
  }
}
.item140 {
  .itemhead {
    background-position: -450px -520px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -1668px;
  }
}
.item141 {
  .itemhead {
    background-position: 0px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -1946px;
  }
}
.item142 {
  .itemhead {
    background-position: -50px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -1946px;
  }
}
.item143 {
  .itemhead {
    background-position: -100px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -1946px;
  }
}
.item144 {
  .itemhead {
    background-position: -150px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -1946px;
  }
}
.item145 {
  .itemhead {
    background-position: -200px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -1946px;
  }
}
.item146 {
  .itemhead {
    background-position: -250px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -1946px;
  }
}
.item147 {
  .itemhead {
    background-position: -300px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -1946px;
  }
}
.item148 {
  .itemhead {
    background-position: -350px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -1946px;
  }
}
.item149 {
  .itemhead {
    background-position: -400px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -1946px;
  }
}
.item150 {
  .itemhead {
    background-position: -450px -560px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -1946px;
  }
}
.item151 {
  .itemhead {
    background-position: 0px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -1946px;
  }
}
.item152 {
  .itemhead {
    background-position: -50px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -1946px;
  }
}
.item153 {
  .itemhead {
    background-position: -100px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -1946px;
  }
}
.item154 {
  .itemhead {
    background-position: -150px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -1946px;
  }
}
.item155 {
  .itemhead {
    background-position: -200px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -1946px;
  }
}
.item156 {
  .itemhead {
    background-position: -250px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -1946px;
  }
}
.item157 {
  .itemhead {
    background-position: -300px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -1946px;
  }
}
.item158 {
  .itemhead {
    background-position: -350px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -1946px;
  }
}
.item159 {
  .itemhead {
    background-position: -400px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -1946px;
  }
}
.item160 {
  .itemhead {
    background-position: -450px -600px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -1946px;
  }
}
.item161 {
  .itemhead {
    background-position: 0px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -2224px;
  }
}
.item162 {
  .itemhead {
    background-position: -50px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -2224px;
  }
}
.item163 {
  .itemhead {
    background-position: -100px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -2224px;
  }
}
.item164 {
  .itemhead {
    background-position: -150px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -2224px;
  }
}
.item165 {
  .itemhead {
    background-position: -200px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -2224px;
  }
}
.item166 {
  .itemhead {
    background-position: -250px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -2224px;
  }
}
.item167 {
  .itemhead {
    background-position: -300px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -2224px;
  }
}
.item168 {
  .itemhead {
    background-position: -350px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -2224px;
  }
}
.item169 {
  .itemhead {
    background-position: -400px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -2224px;
  }
}
.item170 {
  .itemhead {
    background-position: -450px -640px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -2224px;
  }
}
.item171 {
  .itemhead {
    background-position: 0px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -2224px;
  }
}
.item172 {
  .itemhead {
    background-position: -50px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -2224px;
  }
}
.item173 {
  .itemhead {
    background-position: -100px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -2224px;
  }
}
.item174 {
  .itemhead {
    background-position: -150px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -2224px;
  }
}
.item175 {
  .itemhead {
    background-position: -200px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -2224px;
  }
}
.item176 {
  .itemhead {
    background-position: -250px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -2224px;
  }
}
.item177 {
  .itemhead {
    background-position: -300px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -2224px;
  }
}
.item178 {
  .itemhead {
    background-position: -350px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -2224px;
  }
}
.item179 {
  .itemhead {
    background-position: -400px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -2224px;
  }
}
.item180 {
  .itemhead {
    background-position: -450px -680px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -2224px;
  }
}
.item181 {
  .itemhead {
    background-position: 0px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -2502px;
  }
}
.item182 {
  .itemhead {
    background-position: -50px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -2502px;
  }
}
.item183 {
  .itemhead {
    background-position: -100px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -2502px;
  }
}
.item184 {
  .itemhead {
    background-position: -150px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -2502px;
  }
}
.item185 {
  .itemhead {
    background-position: -200px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -2502px;
  }
}
.item186 {
  .itemhead {
    background-position: -250px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -2502px;
  }
}
.item187 {
  .itemhead {
    background-position: -300px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -2502px;
  }
}
.item188 {
  .itemhead {
    background-position: -350px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -2502px;
  }
}
.item189 {
  .itemhead {
    background-position: -400px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -2502px;
  }
}
.item190 {
  .itemhead {
    background-position: -450px -720px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -2502px;
  }
}
.item191 {
  .itemhead {
    background-position: 0px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -2502px;
  }
}
.item192 {
  .itemhead {
    background-position: -50px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -2502px;
  }
}
.item193 {
  .itemhead {
    background-position: -100px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -2502px;
  }
}
.item194 {
  .itemhead {
    background-position: -150px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -2502px;
  }
}
.item195 {
  .itemhead {
    background-position: -200px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -2502px;
  }
}
.item196 {
  .itemhead {
    background-position: -250px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -2502px;
  }
}
.item197 {
  .itemhead {
    background-position: -300px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -2502px;
  }
}
.item198 {
  .itemhead {
    background-position: -350px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -2502px;
  }
}
.item199 {
  .itemhead {
    background-position: -400px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -2502px;
  }
}
.item200 {
  .itemhead {
    background-position: -450px -760px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -2502px;
  }
}
.item201 {
  .itemhead {
    background-position: 0px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -2780px;
  }
}
.item202 {
  .itemhead {
    background-position: -50px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -2780px;
  }
}
.item203 {
  .itemhead {
    background-position: -100px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -2780px;
  }
}
.item204 {
  .itemhead {
    background-position: -150px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -2780px;
  }
}
.item205 {
  .itemhead {
    background-position: -200px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -2780px;
  }
}
.item206 {
  .itemhead {
    background-position: -250px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -2780px;
  }
}
.item207 {
  .itemhead {
    background-position: -300px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -2780px;
  }
}
.item208 {
  .itemhead {
    background-position: -350px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -2780px;
  }
}
.item209 {
  .itemhead {
    background-position: -400px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -2780px;
  }
}
.item210 {
  .itemhead {
    background-position: -450px -800px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -2780px;
  }
}
.item211 {
  .itemhead {
    background-position: 0px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -2780px;
  }
}
.item212 {
  .itemhead {
    background-position: -50px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -2780px;
  }
}
.item213 {
  .itemhead {
    background-position: -100px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -2780px;
  }
}
.item214 {
  .itemhead {
    background-position: -150px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -2780px;
  }
}
.item215 {
  .itemhead {
    background-position: -200px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -2780px;
  }
}
.item216 {
  .itemhead {
    background-position: -250px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -2780px;
  }
}
.item217 {
  .itemhead {
    background-position: -300px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -2780px;
  }
}
.item218 {
  .itemhead {
    background-position: -350px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -2780px;
  }
}
.item219 {
  .itemhead {
    background-position: -400px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -2780px;
  }
}
.item220 {
  .itemhead {
    background-position: -450px -840px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -2780px;
  }
}
.item221 {
  .itemhead {
    background-position: 0px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -3058px;
  }
}
.item222 {
  .itemhead {
    background-position: -50px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -3058px;
  }
}
.item223 {
  .itemhead {
    background-position: -100px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -3058px;
  }
}
.item224 {
  .itemhead {
    background-position: -150px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -3058px;
  }
}
.item225 {
  .itemhead {
    background-position: -200px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -3058px;
  }
}
.item226 {
  .itemhead {
    background-position: -250px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -3058px;
  }
}
.item227 {
  .itemhead {
    background-position: -300px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -3058px;
  }
}
.item228 {
  .itemhead {
    background-position: -350px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -3058px;
  }
}
.item229 {
  .itemhead {
    background-position: -400px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -3058px;
  }
}
.item230 {
  .itemhead {
    background-position: -450px -880px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -3058px;
  }
}
.item231 {
  .itemhead {
    background-position: 0px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -500px -3058px;
  }
}
.item232 {
  .itemhead {
    background-position: -50px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -550px -3058px;
  }
}
.item233 {
  .itemhead {
    background-position: -100px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -600px -3058px;
  }
}
.item234 {
  .itemhead {
    background-position: -150px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -650px -3058px;
  }
}
.item235 {
  .itemhead {
    background-position: -200px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -700px -3058px;
  }
}
.item236 {
  .itemhead {
    background-position: -250px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -750px -3058px;
  }
}
.item237 {
  .itemhead {
    background-position: -300px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -800px -3058px;
  }
}
.item238 {
  .itemhead {
    background-position: -350px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -850px -3058px;
  }
}
.item239 {
  .itemhead {
    background-position: -400px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -900px -3058px;
  }
}
.item240 {
  .itemhead {
    background-position: -450px -920px;
  }
  .itemcontent2 {
    -webkit-mask-position: -950px -3058px;
  }
}
.item241 {
  .itemhead {
    background-position: 0px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: 0px -3336px;
  }
}
.item242 {
  .itemhead {
    background-position: -50px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -50px -3336px;
  }
}
.item243 {
  .itemhead {
    background-position: -100px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -100px -3336px;
  }
}
.item244 {
  .itemhead {
    background-position: -150px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -150px -3336px;
  }
}
.item245 {
  .itemhead {
    background-position: -200px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -200px -3336px;
  }
}
.item246 {
  .itemhead {
    background-position: -250px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -250px -3336px;
  }
}
.item247 {
  .itemhead {
    background-position: -300px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -300px -3336px;
  }
}
.item248 {
  .itemhead {
    background-position: -350px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -350px -3336px;
  }
}
.item249 {
  .itemhead {
    background-position: -400px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -400px -3336px;
  }
}
.item250 {
  .itemhead {
    background-position: -450px -960px;
  }
  .itemcontent2 {
    -webkit-mask-position: -450px -3336px;
  }
}
</style>
