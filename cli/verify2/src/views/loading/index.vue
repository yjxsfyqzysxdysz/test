<template>
  <div id="loading">
    <div class="box">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import loading from './loading.vue'

export default {
  components: {
    loading
  }
}
</script>

<style lang="scss" scoped>
#loading {
  width: 100%;
  height: 300px;
  position: relative;
  background-color: thistle;
  display: flex;
  justify-content: center;
  align-items: center;
  .box {
    width: 100px;
    height: 100px;
    border: 1px solid;
    box-sizing: content-box;
  }
}
</style>
