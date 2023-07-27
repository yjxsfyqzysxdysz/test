<template>
  <div>
    <h1>基础模板</h1>
    <parent :em="toFather">
      <template v-slot:header="{data: ccc}">
        <h1>子组件</h1>
        <p>父->子组件使用 作用域插槽的方式传参</p>
        <p>子->父组件使用 传参为引用类型进行传参</p>
        <input type="text" v-model="ccc.bbb" />
        <p>子->父组件使用 props进行传参</p>
        <input type="text" v-model="toFather" />
        <p>{{ccc}}</p>
      </template>
    </parent>
  </div>
</template>

<script>
import parent from './parent'
export default {
  components: {
    parent
  },
  data() {
    return {
      toFather: 'to'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>