<template>
  <div class="revision3">
    svg版
  </div>
</template>

<script>
import colordata from './colorData.json'

export default {
  name: 'revision3',
  created() {
    this.colordata = colordata
    console.log('revision3-created')
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style lang="scss" scoped>
.revision3 {
}
</style>