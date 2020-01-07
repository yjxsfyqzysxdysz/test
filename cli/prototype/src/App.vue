<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="less">
  @import './assets/css/common';
  html {
    font-size: 16px;
    font-family: 'Helvetica Neue', Helvetica, Tahoma, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei', '微软雅黑', 'WenQuanYi Micro Hei', Arial, sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 0.75rem;
    min-width: 1024px;
  }

  * {
    box-sizing: border-box;
  }

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
</style>
