<template>
  <div id="app">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoItem from './components/tdod-item';
@Component({
  components: {
    TodoItem
  }
})
export default class App extends Vue {
  public edittingIndex = -1
  public list = [
    {
      text: 'leson testScript',
      complete: false
    },
    {
      text: 'leson testScript II',
      complete: false
    }
  ]
  public handleSave({ index, content }: {index: number, content: string}): void {
    this.updateList({ index, content })
    this.handleCancel()
    this.$message.success('success')
  }
  public updateList({ index, content }: {index: number, content: string}): void {
    this.list[index].text = content
  }
  public handleEdit(index: number) {
    this.edittingIndex = index
  }
  public handleCancel() {
    this.edittingIndex = -1
  }
  public handleComplete(index: number) {
    this.list[index].complete = !this.list[index].complete
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
