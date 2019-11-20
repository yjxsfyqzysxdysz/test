<template>
  <div class="logAndReg">
    <div class="btnStyle">
      <el-button type="success">
        <router-link to="login">登录</router-link>
      </el-button>
      <el-button type="warning">
        <router-link to="register">注册</router-link>
      </el-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'logAndReg',
  data () {
    return {
      logAndReg: '登录/注销'
    }
  }
}
</script>

<style lang="less" scoped>
.logAndReg {
  width: 100%;
  height: 300px;
  background: #23d4c6;
  &:before {
    display: table;
    content: "";
  }
  .btnStyle {
    text-align: start;
    margin: 5px 0 0 5px;
  }
}
</style>
