<template>
  <div class="myInfo">
    <div>{{myInfo}}</div>
  </div>
</template>

<script>
export default {
  name: 'myInfo',
  data () {
    return {
      myInfo: '个人中心'
    }
  }
}
</script>

<style lang="less" scoped>
.myInfo {
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
