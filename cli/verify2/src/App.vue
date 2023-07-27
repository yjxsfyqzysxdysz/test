<template>
  <div id="app">
    <!-- <router-view /> -->
    <!--
      keep-alive
      第一次会触发 create 和 mount，之后只会触发 update 钩子
      因为 未被销毁，所以不会触发 destroy
     -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="scss">
@import "assets/css/base.css";
@import "assets/fonts/iconfont.css";
#app {
  height: 100%;
}
</style>
