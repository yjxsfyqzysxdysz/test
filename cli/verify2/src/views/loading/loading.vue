<template>
  <div class="loading">
    <ul class="loadingBox">
      <li v-for="i of 10" :key="i" class="loadingItem" :class="[`loadingItem-${i}`]"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'loading',
}
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.loading {
  width: 100%;
  height: 100%;
  .loadingBox {
    position: absolute;
    .loadingItem {
      width: 10px;
      height: 10px;
      background-color: tomato;
      border-radius: 50%;
      &-1 {
      }
    }
  }
}
</style>
