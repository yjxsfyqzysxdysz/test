 <template>
  <div class="index">
    <div class="main">
      <Button type="warning" shape="circle" icon="md-star" @click="clickBtn">进入</Button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'index',
  data() {
    return {
      timer: null
    }
  },
  mounted() {
    // this.randomFun()
  },
  methods: {
    ...mapActions('login', ['login']),
    randomFun() {
      this.timer = setInterval(() => {
        let num = Math.round(Math.random() * 50)
        if (!num) { num = 1 }
        num = num < 10 ? '0' + num : num
        let url = require(`../assets/image/${num}.jpg`)
        document.styleSheets[0].addRule('div.index::before', `background-image: url(${url});`)
        /**
         * 通过修改伪类来替换背景图
         * 需要注意，class层级的问题
         * 如果使用原先的class，位置原因，不会比原先的层级高
         * 所以需要增加新的层级
         */
      }, 1e4)
    },
    clickBtn() {
      this.login()
        .then(() => {
          this.$router.replace('/navigation')
        })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
.index {
  .main {
    position: absolute;
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    text-align: center;
    line-height: 100px;
  }
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: fixed;
    opacity: 0.5;
    background-color: #fffae9;
    background-image: url(../assets/image/001.jpg);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
