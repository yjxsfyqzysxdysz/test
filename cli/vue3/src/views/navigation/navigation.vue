<template>
  <div class="navigation">
    <div class="profession-box" v-for="(item, index) of mainMenu" :key="index" :style="{order: index}" v-show="item.children.length">
      <div class="profession-title">
        <div class="title-line" :class="[`title-line${i}`]" v-for="i of 2" :key="i"></div>
        <span class="title-font">{{item.name}}</span>
      </div>
      <div class="profession-content">
        <div class="profession-content-box">
          <div class="profession-content-item" ref="professoion" :style="{ left: positionLeft[index].left + 'px' }">
            <div class="col" :class="'col' + col" v-for="col of Math.ceil(item.children.length / 20)" :key="col">
              <div class="list-item" v-for="(item, i) of item.children" :key="i" v-show="Math.ceil((col * 20 - i) / 20) === 1">{{item}}</div>
            </div>
          </div>
        </div>
        <!-- 指示器 -->
        <div class="profession-select profession-select-left" :class="{disabled: positionLeft[index].leftToggle}" @click="selectLeft(index)"><Icon type="ios-arrow-back" size="27" /></div>
        <div class="profession-select profession-select-right" :class="{disabled: positionLeft[index].rightToggle}" @click="selectRight(index)"><Icon type="ios-arrow-forward" size="27" /></div>
      </div>
    </div>
  </div>
</template>

<script>
// import navigation from '@assets/navigation.json'
export default {
  created () {
    let arr = []
    for (let i = 0; i < 43; i++) {
      arr.push(i)
    }
    for (let i = 0; i < 1; i++) {
      this.mainMenu[i].children = arr
      if (arr.length > 20) {
        this.positionLeft[i].rightToggle = false
      }
      this.positionLeft[i].maxNum = -Math.ceil(arr.length / 2) + 10
    }
    // navigation.forEach(e => {
    //   if (e.icon) {
    //     if (e.moduleType === '1') {
    //       this.mainMenu[0].children.push(e)
    //     } else if (e.moduleType === '2') {
    //       this.mainMenu[1].children.push(e)
    //     }
    //   }
    // })
  },
  mounted() {
    this.ele = document.getElementsByClassName('list-item')[0]
    // console.log(ele.clientWidth)
    // console.log(this.$refs.professoion)
  },
  data () {
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
    checkmenue (item) {
      // console.log('导航页点击菜单项：', item)
      // 运维跳转到新运维
      // if (item.url === '/ops/deviceMonitor' || item.url === '/settings/ops') {
      //   if (!this.opsHost) {
      //     this.warningMsg('请配置运维地址！')
      //     return
      //   }
      // }
      // this.momentCheck = item.tag
      // const data = { children: item.children, item: item.tag }
      // // 对地图模块特殊处理，根据系统参数2/3D配置设置点击地图模块的跳转路径
      // this.setMenueList(data).then(() => {
      //   if (item.tag === '/map/module') { // 地图应用
      //     this.getTwoImensionalInfo().then(res => { // 获取2D/3D默认配置
      //       if (res.mapType) {
      //         let mapMode = res.mapType.default ? res.mapType.default : MAPMODE.mode2D
      //         let url = '/map/' + mapMode
      //         if (mapMode === MAPMODE.mode3D) {
      //           let map3DType = res.mapType.map3DType ? res.mapType.map3DType : MAPMODE.mapType3D.superMap
      //           let menu3D = item.children.find(child => { return child.url === url })
      //           if (menu3D.children && menu3D.children.length) {
      //             url = menu3D.children.find(child => { return child.name === map3DType }).url
      //           }
      //         }
      //         this.$router.replace({ path: url })
      //       }
      //     })
      //   } else if (item.tag === '/mapEdit') { // 地图编辑
      //     this.getTwoImensionalInfo().then(res => { // 获取2D/3D默认配置
      //       if (res.mapType) {
      //         let mapMode = res.mapType.default ? res.mapType.default : MAPMODE.mode2D
      //         let url = '/mapEdit/' + mapMode
      //         if (mapMode === MAPMODE.mode3D) {
      //           let map3DType = res.mapType.map3DType ? res.mapType.map3DType : MAPMODE.mapType3D.superMap
      //           let menu3D = item.children.find(child => { return child.url === url })
      //           if (menu3D.children && menu3D.children.length) {
      //             url = menu3D.children.find(child => { return child.name === map3DType }).url
      //           }
      //         }
      //         this.$router.replace({ path: url })
      //       }
      //     })
      //   } else {
      //     this.$router.replace({ path: item.children[0].url })
      //   }
      // }).catch((err) => {
      //   console.log('set menulist err' + err)
      // })
    },
    selectLeft(index) {
      if (this.positionLeft[index].leftToggle) { return }
      this.positionLeft[index].num++
      this.positionLeft[index].left = this.positionLeft[index].num * this.ele.clientWidth
      this.positionLeft[index].rightToggle = false
      if (!this.positionLeft[index].num) {
        this.positionLeft[index].leftToggle = !this.positionLeft[index].leftToggle
      }
    },
    selectRight(index) {
      if (this.positionLeft[index].rightToggle) { return }
      this.positionLeft[index].num--
      this.positionLeft[index].left = this.positionLeft[index].num * this.ele.clientWidth
      this.positionLeft[index].leftToggle = false
      if (this.positionLeft[index].num === this.positionLeft[index].maxNum) {
        this.positionLeft[index].rightToggle = !this.positionLeft[index].rightToggle
      }
    }
  }
}
</script>

<style lang="less" scope>
.navigation {
  min-height: 700px;
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
      // 标题 线
      .title-line {
        width: 30%;
        height: 1px;
        position: absolute;
        top: 50%;
        background-image: linear-gradient(to top, #3f51b5, #00bcd4, #3f51b5);
      }
      .title-line1 {
        left: 10%;
      }
      .title-line2 {
        right: 10%;
      }
      // 标题
      .title-font {
        user-select: none;
        font-size: 2em;
        font-weight: bold;
      }
    }
    // 内容
    .profession-content {
      height: calc(100% - 42px);
      display: flex;
      position: relative;
      .profession-content-box {
        width: 100%;
        height: calc(100% - 32px);
        margin: 16px 32px;
        overflow: hidden;
      }
      .profession-content-item {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;
        transition: left 1.5s;
        .col {
          height: 100%;
          width: 100%;
          flex-shrink: 0;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-content: flex-start;
          .list-item {
            width: calc(100% / 10);
            height: calc(100% / 2);
            background: #ccc;
            display: inline-block;
          }
        }
      }
    }
    // 选择器
    .profession-select {
      position: absolute;
      height: calc(100% - 32px);
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
    }
    .profession-select.disabled {
      // cursor: no-drop;
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
