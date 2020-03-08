<template>
  <div class="navigation">
    <div class="profession-box" v-for="(item, index) of mainMenu" :key="index" :style="{order: index}">
      <div class="profession-title">
        <div class="title-line" :class="[`title-line${i}`]" v-for="i of 2" :key="i"></div>
        <span class="title-font">{{item.name}}</span>
      </div>
      <div class="profession-content" align="center" @mouseenter.stop="showAplia = true" @mouseleave.stop="showAplia = false">
        <div :class="['profession-content-icon', showAplia ? (curAppPage === 0 ? 'disabled' : '') : 'disabled']">
          <i class="iconfont icon-jiantou-copy icon-left" @click="aplicationLeft"></i>
        </div>
        <div class="profession-content-box" align="left">
          <div class="list-item" v-for="menu in applicationArr[curAppPage]" :key="menu.tag">
            <div :class="{'selectcolor': momentCheck === menu.tag}" class="pic-item" @click="checkmenue(menu)">
              <i class="icon iconfont" :class="[menu.icon]"></i>
            </div>
            <p :class="{'selecttext': momentCheck === menu.tag}">{{menu.name}}</p>
          </div>
        </div>
        <div :class="['profession-content-icon', showAplia ? (curAppPage >= applicationArr.length - 1 ? 'disabled' : '') : 'disabled']">
          <i class="iconfont icon-jiantou icon-right"  @click="aplicationRight"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import navigation from 'src/navigation.json'
// import navigation1 from '@/navigation.json'
// import navigation from '../../common/navigation.json'
export default {
  mounted() {
    console.log(navigation)
  },
  data () {
    return {
      mainMenu: [
        { name: '大型测试', children: [] },
        { name: '小型测试', children: [] }
      ],
      curAppPage: 0,
      curSetPage: 0,
      showAplia: false,
      showSetting: false,
      applicationArr: []
    }
  },
  methods: {
    checkmenue(item) {
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
    aplicationLeft() {
      this.curAppPage > 0 ? this.curAppPage -= 1 : this.curAppPage = 0
    },
    aplicationRight() {
      if (this.applicationArr.length) {
        this.curAppPage < this.applicationArr.length - 1 ? this.curAppPage += 1 : this.curAppPage = this.applicationArr.length - 1
      }
    },
    settingLeft() {
      this.curSetPage > 0 ? this.curSetPage -= 1 : this.curSetPage = 0
    },
    settingRight() {
      if (this.settingArr.length) {
        this.curSetPage < this.settingArr.length - 1 ? this.curSetPage += 1 : this.curSetPage = this.settingArr.length - 1
      }
    }
  },
}
</script>

<style lang="less" scope>
  .navigation {
    min-height: 700px;
    height: 100%;
    width: 100%;
    // overflow: auto;
    // background-size: 100% 100%;
    padding: 40px 60px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    .profession-box {
      flex: 1;
      background: #ccc;
      height: 50%;
      width: 100%;
      text-align: center;
      // 标题
      .profession-title {
        position: relative;
        // 标题 线
        .title-line {
          width: 30%;
          height: 1px;
          position: absolute;
          top: 50%;
          background-image: linear-gradient(to top, #3F51B5, #00BCD4, #3F51B5);
        }
        .title-line1 {
          left: 10%;
          }
        .title-line2 {
          right: 10%;
        }
        // 标题
        .title-font {
          font-size: 2em;
          font-weight: bold;
        }
      }
    }
  }
</style>
