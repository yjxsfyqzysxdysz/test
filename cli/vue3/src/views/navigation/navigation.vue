<template>
  <div class="navigation">
    <div class="profession-box" v-for="(item, index) of mainMenu" :key="index" :data-num="index">
      <p class="profession-title">{{item.name}}</p>
      <div class="profession-content">
        <div class="profession-content-box">
          <div class="profession-content-item" ref="professoion" :style="{ left: positionLeft[index].left + 'px' }">
            <div class="list-item" v-for="(item, i) of item.children" :key="i">
              <i class="icon iconfont" :class="item.icon" @click="checkmenue(item)"></i>
              <span class="txt">{{item.name}}</span>
            </div>
          </div>
        </div>
        <!-- 指示器 -->
        <div class="profession-select profession-select-left" :class="{disabled: positionLeft[index].leftToggle}" @click="selectLeft(index)">
          <i class="icon iconfont icon-jiantou-copy"></i>
        </div>
        <div class="profession-select profession-select-right" :class="{disabled: positionLeft[index].rightToggle}" @click="selectRight(index)">
          <i class="icon iconfont icon-jiantou"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navlist from '@/navlist.js'

export default {
  created() {
    this.init()
  },
  mounted() {
    this.ele = document.getElementsByClassName('list-item')[0]
  },
  data() {
    return {
      mainMenu: [
        { name: '大型测试', children: [] },
        { name: '小型测试', children: [] }
      ],
      ele: null,
      positionLeft: [
        { left: 0, num: 0, leftToggle: true, rightToggle: true, maxNum: 0 },
        { left: 0, num: 0, leftToggle: true, rightToggle: true, maxNum: 0 }
      ]
    }
  },
  methods: {
    init() {
      navlist.forEach(e => {
        this.mainMenu[e.type - 1].children.push(e)
      })
    },
    checkmenue(item) {
      this.$router.push(item.path)
    },
    selectLeft(index) {
      if (this.positionLeft[index].leftToggle) { return }
      this.positionLeft[index].num++
      this.positionLeft[index].left = this.positionLeft[index].num * this.ele.clientWidth
      this.positionLeft[index].rightToggle && (this.positionLeft[index].rightToggle = false)
      if (!this.positionLeft[index].num) {
        this.positionLeft[index].leftToggle = !this.positionLeft[index].leftToggle
      }
    },
    selectRight(index) {
      if (this.positionLeft[index].rightToggle) { return }
      this.positionLeft[index].num--
      this.positionLeft[index].left = this.positionLeft[index].num * this.ele.clientWidth
      this.positionLeft[index].leftToggle && (this.positionLeft[index].leftToggle = false)
      if (this.positionLeft[index].num === this.positionLeft[index].maxNum) {
        this.positionLeft[index].rightToggle = !this.positionLeft[index].rightToggle
      }
    }
  },
  beforeDestroy() {
    this.ele = null
  }
}
</script>

<style lang="less" scoped>
.navigation {
  height: 100%;
  width: 100%;
  padding: 40px 60px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  .profession-box {
    flex-shrink: 1;
    height: 50%;
    width: 100%;
    min-width: 1200px;
    // 标题
    .profession-title {
      position: relative;
      text-align: center;
      user-select: none;
      font-size: 2em;
      font-weight: bold;
      // 标题 线
      &::before,
      &::after {
        content: "";
        display: block;
        width: 30%;
        height: 1px;
        position: absolute;
        top: 50%;
        background-image: linear-gradient(to top, #3f51b5, #00bcd4, #3f51b5);
      }
      &::before {
        left: 10%;
      }
      &::after {
        right: 10%;
      }
    }
    // 内容
    .profession-content {
      height: calc(~"100% - 42px");
      display: flex;
      position: relative;
      .profession-content-box {
        width: 100%;
        height: calc(~"100% - 32px");
        margin: 16px 32px;
        overflow: hidden;
      }
      .profession-content-item {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        transition: left 1.5s;
        flex-wrap: wrap;
        flex-direction: column;
        align-content: flex-start;
        .list-item {
          width: 10%;
          height: 50%;
          background: #f9f9f9;
          text-align: center;
          .icon {
            display: block;
            font-size: 60px;
            cursor: pointer;
            margin-top: 10%;
          }
          .txt {
            padding-top: 10px;
            font-size: 1.3em;
          }
          &:hover .icon {
            color: #003c96;
            transform: scale(1.2);
            transition: all 200ms linear 200ms;
          }
        }
      }
    }
    // 选择器
    .profession-select {
      position: absolute;
      height: calc(~"100% - 32px");
      width: 25px;
      background: #cccccc52;
      margin: 16px 5px;
      border-radius: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      opacity: 0.2;
      transition: opacity 0.9s;
      &:hover {
        opacity: 0.8;
        transition: opacity 0.9s;
      }
      .icon {
        font-size: 27px;
      }
    }
    .profession-select.disabled {
      cursor: default;
      &:hover {
        opacity: 0.1;
      }
    }
    .profession-select-left {
      left: 0;
    }
    .profession-select-right {
      right: 0;
    }
  }
}
</style>
