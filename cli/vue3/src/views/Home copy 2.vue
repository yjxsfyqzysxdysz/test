<template>
  <div class="home">
    <Row v-for="(rItem, rIndex) of cardList" type="flex" justify="space-around" align="top" class="rowStyle" :key="rIndex">
      <Col :sm="12" :md="8" :lg="6" v-for="(cItem, cIndex) of rItem" :key="cIndex">
        <Card :bordered="false">
          <p slot="title">{{cItem.title}}</p>
          <p>{{cItem.info}}</p>
          <div class="butStyle">
            <Button type="success" @click="clickBtn(cItem.ref)">进入</Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      cardList: [
        [
          {
            title: '测试一',
            info: 'infoinfoinfoinfo',
            ref: '/test1'
          }
        ]
      ]
    }
  },
  methods: {
    clickBtn(url) {
      if (['null', 'undefined', ''].includes(JSON.stringify(url))) { return }
      this.$router.push({ path: url })
    }
  }
}
</script>

<style lang="less" scope>
  .home {
    .rowStyle {
      background-color: #eee;
      .ivu-col {
        padding: 8px;
        .ivu-card-head {
          text-align: center;
        }
      }
      .butStyle {
        margin-top: 16px;
        text-align: center;
      }
    }
  }
</style>
