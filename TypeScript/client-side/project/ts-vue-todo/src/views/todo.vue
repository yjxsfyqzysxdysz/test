<template>
  <div class="todo-page">
    <ul>
      <todo-item
        v-for="(item, index) of list"
        :item="item"
        :index="index"
        :editting-index="edittingIndex"
        :key=index
        @on-save="handleSave"
        @on-edit="handleEdit"
        @on-cancel="handleCancel"
        @on-complete="handleComplete"
      >
      </todo-item>
    </ul>
    <a-button @click="turn">jump</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoItem from '../components/tdod-item';
import { State, Mutation } from 'vuex-class'

@Component ({
  name: 'TodoPage',
  components: {
    TodoItem
  }
})
export default class Todo extends Vue {
  // 在实例上的属性、方法，都可以在这个类中，作为实例属性来定义
  @State('todoList') public list // 使用vuex
  @Mutation('updateList') public updateList
  @Mutation('todoItemComplete') public handleComplete
  public edittingIndex = -1
  // public list = [
  //   {
  //     text: 'leson testScript',
  //     complete: false
  //   },
  //   {
  //     text: 'leson testScript II',
  //     complete: false
  //   }
  // ]
  public handleSave({ index, content }) {
    // this.list[index].text = content
    this.updateList({index, content})
    this.handleCancel()
  }
  public handleEdit(index) {
    this.edittingIndex = index
  }
  public handleCancel() {
    this.edittingIndex = -1
  }
  // public handleComplete(index) {
  //   this.list[index].complete = true
  // }
  public turn() {
    this.$router.push({
      name: 'show'
    })
  }
}
</script>
