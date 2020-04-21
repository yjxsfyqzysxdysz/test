<template>
  <div class="show">
    <p v-for="(item, index) of list" :key="index" :style="{ textDecoration: item.complete ? 'line-through' : '' }">{{item}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class'
@Component({
  name: 'show'
})

export default class Show extends Vue {
  @State('todoList') public list
}
</script>