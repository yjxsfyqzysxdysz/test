<template>
  <div id="app">
    <CheckBox :checked="[1,2,3]"></CheckBox>
  </div>
</template>

<script>
import CheckBox from './components/CheckBox'
export default {
  name: 'App',
  components: {
    CheckBox
  },
  mounted () {
    console.log('CheckBox')
  }
}
</script>

<style lang="less">
</style>
