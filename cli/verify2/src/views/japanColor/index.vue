<template>
  <div class="project2">
    <div class="header">
      <el-menu mode="horizontal" default-active="1" background-color="#1c1c1c" text-color="#1e88a8" active-text-color="#ffc408" @select="onSelect">
        <el-menu-item v-for="(item, index) of menuItemList" :key="index" :index="`${index + 1}`">
          <i class="iconfont" :class="[item.icon]" /> {{item.text}}
        </el-menu-item>
        <el-menu-item index="revision0" to="/navigation">
          <i class="iconfont icon-recovery" />
          返回
        </el-menu-item>
      </el-menu>
    </div>
    <components :is="componentInfo" class="revision" />
  </div>
</template>

<script>
import revision1 from './revision1' // 图片版
import revision2 from './revision2' // Canvas版
import revision3 from './revision3' // Svg版
import revision4 from './revision4' // Echarts版
export default {
  name: 'project2',
  created() {
    this.onSelect(1)
  },
  components: {
    revision1,
    revision2,
    revision3,
    revision4
  },
  data() {
    return {
      componentInfo: '',
      menuItemList: [
        { text: '图片版', icon: 'icon-tuceng' },
        { text: 'Canvas版', icon: 'icon-icon' },
        { text: 'Svg版', icon: 'icon-collection' },
        { text: 'Echarts版', icon: 'icon-focusing' }
      ]
    }
  },
  methods: {
    // 点击标签
    onSelect(name) {
      if (name) {
        this.componentInfo = `revision${name}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.project2 {
  height: 100%;
  .header {
    width: 100%;
    position: fixed;
    background-color: transparent;
    z-index: 1;
  }
  .revision {
    min-height: 100%;
    transition: background-color 1s linear;
    display: flex;
    justify-content: center;
    padding: 71px 40px;
  }
}
.ivu-menu {
  background-color: #0000005e;
  padding: 0 20px;
}
</style>
