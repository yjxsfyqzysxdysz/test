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
      ]
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
</style>
