import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import './index.less'

interface Item {
  text: string;
  complete: boolean;
}

@Component({
  name: 'TodoItem'
})

export default class TodoItem extends Vue {
  @Prop(Object) public item!: Item;
  @Prop(Number) public index!: number;
  @Prop(Number) public edittingIndex!: number;

  public edittingConent = '';

  @Watch('edittingIndex')
    public edittingChange(index) {
    if (index === this.index) {
        this.edittingConent = this.item.text
    } else {
      this.edittingConent = ''
      }
    }

  // 方法一
  // public save() {
  //   this.$emit('on-save', {
  //     index: this.index,
  //     content: this.edittingConent
  //   });
  // }

  // 方法二
  @Emit('on-save')
  public save(index, content, event) {
    event.stopPropagation() // 阻止事件冒泡
    return {
      index,
      content
    }
  }

  // 方法三
  @Emit()
  public onEdit(event) {
    event.stopPropagation() // 阻止事件冒泡
    return this.index
  }

  // public edit() {
  //   this.$emit('on-edit', this.index);
  // }

  public cancel(event) {
    event.stopPropagation() // 阻止事件冒泡
    this.$emit('on-cancel');
  }

  public complete() {
    this.$emit('on-complete', this.index)
  }

  protected render() {
    return (
      <li class='item-wrap'>
        {
          this.edittingIndex === this.index
            ? (<div>
              <a-input v-model={this.edittingConent} style='width: 200px;'></a-input>
              <a-icon type='check' nativeOn-click={ this.save.bind(this, this.index, this.edittingConent) }></a-icon>
              <a-icon type='close' nativeOn-click={this.cancel}></a-icon>
            </div>)
            : (<div>
              <span on-click={this.complete} style={this.item.complete ? {textDecoration: 'line-through'} : {} }>{this.item.text}</span>
              <a-icon type='edit' nativeOn-click={this.onEdit}></a-icon>
          </div>)
        }
      </li>
    );
  }
}

/**
 * 使用 native 添加自定义事件
 * 双花括号在此处为单花括号
 * 指令后的引号此处为单花括号
 */
