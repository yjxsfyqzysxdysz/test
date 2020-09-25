<template>
  <div class="CopyModal">
    <div class="item title">
      <el-checkbox v-model="allCheck.checkAll" :indeterminate="allCheck.isIndeterminate" @change="handleCheckAll">全选</el-checkbox>
    </div>
    <div class="item content">
      <el-checkbox-group v-model="checkedData" @change="handleChecked">
        <el-checkbox v-for="(item, index) of checkList" :key="index" class="checkStyle" :label="item.value">
          <span class="text" :title="item.label">{{ item.label }}</span>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="item btn">
      <el-button type="primary" @click="sure">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CopyModal',
  props: {
    terminal: { // 通道号/端子号 当前选中的
      type: Array,
      default: () => []
    },
    channelList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      allCheck: {
        checkAll: false, // 全选
        isIndeterminate: false // 半选
      },
      checkedData: [],
      checkList: []
    }
  },
  mounted () {
    this.checkList = JSON.parse(JSON.stringify(this.channelList))
    console.log('terminal', JSON.stringify(this.terminal))
    if (this.terminal.length) {
      this.checkedData = JSON.parse(JSON.stringify(this.terminal))
      this.handleChecked(this.terminal)
    }
  },
  methods: {
    handleCheckAll (val) { // 全选
      let tmp = []
      if (val) {
        this.checkList.forEach(e => {
          tmp.push(e.value)
        })
      }
      this.checkedData = tmp
      this.allCheck.isIndeterminate = false
    },
    handleChecked (val) { // 单选
      console.log(JSON.parse(JSON.stringify(this.checkedData)))
      let checkedCount = val.length
      this.allCheck.checkAll = checkedCount === this.checkList.length
      this.allCheck.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList.length
    },
    sure () {
      this.loading = true
      this.$emit('save', [...this.checkedData])
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
.CopyModal {
  width: 100%;
  user-select: none;
  .item {
    margin-bottom: 16px;
    & > span {
      font-size: 14px;
    }
    & > button {
      margin: 0 auto;
    }
  }
  .title {
    margin: 0;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
  }
  .content {
    margin-left: 10px;
    display: inline-block;
    max-height: 300.8px;
    overflow-y: auto;
    .checkStyle {
      margin: 10px 4px;
    }
    .text {
      display: inline-block;
      width: 20px;
    }
  }
  .btn {
    display: flex;
    justify-content: center;
  }
}
</style>
 