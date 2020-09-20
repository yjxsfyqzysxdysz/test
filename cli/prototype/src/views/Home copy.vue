<template>
  <div class="home">
    <!-- 左侧目录 -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </template>
          <MenuItem name="1-1">Option 1</MenuItem>
          <MenuItem name="1-2">Option 2</MenuItem>
          <MenuItem name="1-3">Option 3</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </template>
          <MenuItem name="2-1">Option 1</MenuItem>
          <MenuItem name="2-2">Option 2</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </template>
          <MenuItem name="3-1">Option 1</MenuItem>
          <MenuItem name="3-2">Option 2</MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 右侧 -->
    <Layout :style="{marginLeft: '200px'}">
      <!-- main -->
      <Content :style="{padding: '0 16px 16px'}">
        <!-- 路径 -->
        <Breadcrumb :style="{margin: '16px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <!-- content -->
        <Card>
          <div style="height: 600px; text-align: left;">
            <div style="margin-top: 10px;width: 200px;">
              <Input v-for="(item, index) of inputVal" :key="index" v-model="item.val" :maxlength="item.val.indexOf('\n') > 0 ? 65 : 64" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="请输入" @on-keyup="channelChange(index)" @on-keydown="channelChange(index)"/>
            </div>
          </div>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      modalToogle: false,
      inputVal: [
        { val: '' },
        { val: '' }
      ]
    }
  },
  methods: {
    chkstrlen(data) { // 限制长度
      let strlen = 0
      let enter = false
      if (data.indexOf('\n') > 0) { // 是否有折行
        strlen = -1
      }
      let str = data
      let count = 0
      let i
      for (i = 0; i < data.length; i++) {
        if (str.charCodeAt(i) === 10) { // 如果有折行
          if (enter) {
            str = str.substring(0, i - count) + str.substring(i + 1 - count, str.length - count)
            count++
          }
          enter = true
          continue
        }
        if (str.charCodeAt(i) > 255 || str.charCodeAt(i) === 183) { // 如果是汉字，则字符串长度加2(0-255 字母 183 点)
          strlen += 2
        } else {
          strlen++
        }
        if (strlen > 64) {
          break
        }
      }
      str = str.substr(0, i - count) // 抽取从 start 下标开始的指定数目的字符
      return str
    },
    channelChange(index) { // 限制只允许折行一次
      this.inputVal[index].val = this.chkstrlen(this.inputVal[index].val)
      if (this.chkstrlen(this.inputVal[index].val).replace(/[\r\n]/g, '').length > 64) {
        this.inputVal[index].val = this.inputVal[index].val.substr(0, this.inputVal[index].val.length - 1)
      }
    }
  }
}
</script>

<style lang="less" scope>
.home {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.center {
  text-align: center;
}
.item {
  margin-bottom: 16px;
  label {
    margin-right: 16px;
  }
}
</style>
