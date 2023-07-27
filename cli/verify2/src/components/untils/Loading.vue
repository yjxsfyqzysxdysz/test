<template>
  <div class="loadingBox">
    <div class="loading">
      <img :src="imgSrc" class="loadingIcon" />
      <p class="loadingMessage">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loadingBoxImg',
  data() {
    return {
      message: '',
      imgSrc: require('')
    }
  }
}
</script>

<style lang="scss" scoped>
.loadingBox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  z-index: 200;
  .loading {
    height: 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1),
      0 12px 14px 0 rgba(0, 0, 0, 0.1);
    .loadingIcon {
      width: 52px;
      height: 52px;
      float: left;
      margin: 24px 24px 0 48px;
    }
    .loadingMessage {
      line-height: 100px;
      margin-right: 48px;
      font-size: 16px;
      float: left;
    }
  }
}
</style>
