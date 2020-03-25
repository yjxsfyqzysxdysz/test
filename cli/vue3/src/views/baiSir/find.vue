<template>
  <div class="find">
    <div>{{find}}</div>
  </div>
</template>

<script>
export default {
  name: 'find',
  data () {
    return {
      find: '探索'
    }
  }
}
</script>

<style lang="less" scoped>
.find {
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
