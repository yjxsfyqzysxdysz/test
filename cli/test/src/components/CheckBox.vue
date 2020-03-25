<template>
  <div id="checkBox">
    <div class="select-all">
      <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAll">全部</Checkbox>
    </div>
    <div class="select">
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox v-for="item of checkList" :key="item" :label="item">{{item}}</Checkbox>
      </CheckboxGroup>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checked: {
      type: Array,
      default: () => []
    }
  },
  mounted () {
    this.checkAllGroup = this.checked
    this.checkAllGroupChange(this.checked)
  },
  data () {
    return {
      indeterminate: false, // 全选样式
      checkAll: false, // 全选样式
      checkAllGroup: [],
      checkList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods: {
    checkAllGroupChange (data) { // 单选
      if (data.length === this.checkList.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (data.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    handleCheckAll () { // 全选
      if (this.indeterminate) {
        this.checkAll = true
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      if (this.checkAll) {
        this.checkAllGroup = [...this.checkList]
      } else {
        this.checkAllGroup = []
      }
    },
  }
}
</script>

<style lang="less" scope>
#checkBox {
  width: 400px;
  height: 30px;
  margin: 16px;
  background: lightpink;
  .select-all {
    display: inline-block;
    margin-right: 15px;
  }
  .select {
    margin: 5px;
  }
}
</style>
