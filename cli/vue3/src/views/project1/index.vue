<template>
  <div class="project1 clearFloat">
    <div class="header clearFloat">
      <Button class="back floatRight" type="primary" @click="back">返回</Button>
    </div>
    <div class="nav floatLift"></div>
    <div class="content floatRight">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'project1',
  created() {
    console.log('/project1')
  },
  data() {
    return {

    }
  },
  methods: {
    back() {
      this.$router.push('/navigation')
    }
  },
}
</script>

<style lang="less" scoped>
.project1 {
  background-color: cornsilk;
  // display: flex;
  width: 100%;
  height: 100%;
  .header {
    height: 65px;
    background: #2ea9df;
    .back {
      margin-right: 20px;
      margin-top: calc(~"65px / 2");
      transform: translateY(-50%);
    }
  }
  .nav,
  .content {
    height: calc(~"100% - 65px");
    padding: 10px;
    // background-color: ghostwhite;
  }
  .nav {
    width: 200px;
  }
  .content {
    width: calc(~"100% - 200px");
  }
}
</style>