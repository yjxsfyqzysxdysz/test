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
      <!-- 头部 -->
      <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
        <Button shape="circle" @click="skip">Circle</Button>
      </Header>
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
            <p class="center">Content</p>
            <Button type="error" @click="click" title="菜单">点击</Button>
            <div style="margin-top: 10px;width: 200px;">
              <Input v-for="(item, index) of inputVal" :key="index" v-model="item.val" :maxlength="item.val.indexOf('\n') > 0 ? 65 : 64" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="请输入" @on-keyup="channelChange(index)" @on-keydown="channelChange(index)"/>
            </div>
            <TimePicker type="time" placeholder="Select time" style="width: 168px"></TimePicker>
            <div class="item" v-for="(item, index) of timeList" :key="index" @click="acl(index)">
              <label>{{ item.label }}</label>
              <TimePicker v-model="item.value" :open="open[index]" readonly transfer type="timerange" placement="bottom" placeholder="Select time" style="width: 200px;" size="small" format="HH:mm:ss">
                <Input icon="ios-clock-outline" class="inputIcon" readonly size="small" :value="item.value | filteTimeVal" @on-click="inputClick(index)" @on-focus="inputClick(index)" @on-blur="inputClick(index)"/>
              </TimePicker>
            </div>
          </div>

        </Card>
      </Content>
    </Layout>
    <Modal v-model="modalToogle" :draggable="true" footer-hide>
      <div slot="header"><p class="center">早餐</p></div>
      <div style="height: 300px;">
        <Scroll>
          <Row v-for="(item, i) of list" :key="i" type="flex" justify="center" align="middle" style="margin-bottom: 5px;">
            <Col span="8">
              <Card>
                <p class="center" :title="item.title">{{item.title}}</p>
              </Card>
            </Col>
            <Col span="2" offset="1">
              <Button type="success" shape="circle" size="small" icon="md-add" @click="show(i)"></Button>
            </Col>
            <Col span="10" offset="1">
              <div v-show="i===mainIndex">{{item.content}}</div>
            </Col>
          </Row>
        </Scroll>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      modalToogle: false,
      mainIndex: -1,
      list: [
        {
          title: '清明套餐',
          content: '宫保鸡丁、麻婆豆腐、毛血旺、油焖大虾、干煸辣子鸡、蒜蓉粉丝开背虾、盐煎肉、小鸡炖蘑菇'
        },
        {
          title: '除夕套餐',
          content: '蒜蓉粉丝开背虾'
        },
        {
          title: '白露套餐',
          content: '干煸豆角、麻婆豆腐、毛血旺、油焖大虾、剁椒鱼头、水煮肉片、盐煎肉、小鸡炖蘑菇'
        },
      ],
      inputVal: [
        { val: '' },
        { val: '' }
      ],
      timeList: [],
      open: { // 时间选择器显隐性
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false
      }
    }
  },
  mounted () {
    this.timeList = []
    for (let len = this.timeList.length; len < 8; len++) {
      this.timeList.push({ value: ['00:00:00', '00:00:00'], label: '时间段' + (len + 1) })
    }
  },
  methods: {
    click() {
      this.modalToogle = true
    },
    show(index) {
      if (this.mainIndex === index) {
        this.mainIndex = -1
      } else {
        this.mainIndex = index
      }
    },
    skip() {
      this.$router.push({ path: '/baiHome' })
    },
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
    },
    inputClick(index) { // 点击input
      console.log(index)
      if (!this.open[index]) {
        for (let i in this.open) {
          if (this.open[i] && i - index) {
            this.open[i] = false
            break
          }
        }
      }
      this.open[index] = !this.open[index]
    },
    acl(index) {
      console.log('acl', index)
    }
  },
  filters: {
    filteTimeVal: (item) => {
      return `${item[0]} - ${item[1]}`
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
