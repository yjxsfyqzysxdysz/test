<template>
  <div class="login">
    <div>{{login}}</div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      login: '登录'
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #67C23A;
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
