<template>
  <div class="news">
    <div>{{news}}</div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data () {
    return {
      news: '新闻链接区域'
    }
  }
}
</script>

<style lang="less" scoped>
.news {
  width: 100%;
  height: 100%;
  background: #23d4c6;
  text-align: center;
  div {
    height: 100%;
    &::before {
      display: inline-block;
      content: "";
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
