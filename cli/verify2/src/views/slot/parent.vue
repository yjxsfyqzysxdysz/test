<template>
  <div>
    <h1>父组件</h1>
    <input type="text" v-model="obj.aaa" />
    <p>{{obj}}</p>
    <slot name="header" :data="obj">
      slot header
    </slot>
    <span>{{fromChild}}</span>
  </div>
</template>

<script>
export default {
  props: {
    em: {
      type: String,
      default: 'emememe'
    }
  },
  computed: {
    fromChild: function() {
      return this.em
    }
  },
  data() {
    return {
      obj: {
        aaa: 1, bbb: 2
      }
    }
  }
}
</script>
