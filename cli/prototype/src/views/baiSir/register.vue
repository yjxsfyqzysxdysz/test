<template>
  <div class="register">
    <div>{{register}}</div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      register: '注册'
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  width: 100%;
  height: 100%;
  background: #E6A23C;
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
