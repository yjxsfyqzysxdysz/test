<template>
  <div class="flip">
    <div class="header clearFloat">
      <el-button class="back floatRight" type="primary" @click="back">返回</el-button>
    </div>
    <div class="content">
      <div class="left">
        <el-button type="success" round @click="sort">排序</el-button>
        <div class="list" ref="list">
          <div v-for="e of list" :key="e" :class="`item-${e}`">
            {{e}}
          </div>
        </div>
      </div>
      <div class="right">
        <p>
          FLIP思想：
        </p>
        <p>
          <span>F：
          </span>Fist —— 一个元素的起始位置
        </p>
        <p>
          <span>L：
          </span>Last —— 另一个元素的终止位置，注意另一个这个词，后面会有具体代码的体现
        </p>
        <p>
          <span>I：
          </span>Invert —— 计算"F"与"L"的差异，包括位置，大小等，并将差异用transform属性，添加到终止元素上，让它回到起始位置，也是此项技术的核心
        </p>
        <p>
          <span> P：
          </span>Play —— 添加transtion 过渡效果，清除Invert阶段添加进来transform，播放动画
        </p>
      </div>
    </div>
  </div>
</template>

<script>
class Flip {
  constructor(node) {
    this.rootNode = node
    this.firstNodeList = new Map()
    this.lastNodeList = new Map()
  }
  first() {
    for (let index = 0, nodes = this.rootNode.childNodes, n = nodes.length; index < n; index++) {
      const node = nodes[index]
      const { bottom, height, left, right, top, width, x, y } = node.getBoundingClientRect()
      this.firstNodeList.set(node.innerText, { index, bottom, height, left, right, top, width, x, y })
    }
  }
  last() {
    for (let index = 0, nodes = this.rootNode.childNodes, n = nodes.length; index < n; index++) {
      const node = nodes[index]
      const { bottom, height, left, right, top, width, x, y } = node.getBoundingClientRect()
      this.lastNodeList.set(node.innerText, { index, bottom, height, left, right, top, width, x, y })
    }
    this.invert()
    return this
  }
  invert() {
    this.lastNodeList.forEach((value, key) => {
      const { x: lastX, y: lastY, index } = value
      const { x: firstX, y: firstY } = this.firstNodeList.get(key)
      const [difX, difY] = [firstX - lastX, firstY - lastY]
      const nodeStyle = this.rootNode.childNodes[index].style
      if (nodeStyle.transition) {
        nodeStyle.transition = ''
      }
      if (difX || difY) {
        nodeStyle.transformOrigin = "0 0"
        nodeStyle.transform = `translate(${difX}px,${difY}px)`
        this.firstNodeList.set(key, value)
      }
    })
    this.lastNodeList.clear()
  }
  play() {
    setTimeout(() => {
      for (let index = 0, nodes = this.rootNode.childNodes, n = nodes.length; index < n; index++) {
        const nodeStyle = nodes[index].style
        if (nodeStyle.transform) {
          nodeStyle.transition = 'all .5s'
          nodeStyle.transformOrigin = ''
          nodeStyle.transform = ''
        }
      }
    })
  }
}
export default {
  name: 'Flip',
  mounted() {
    this.flip = new Flip(this.$refs.list)
    this.flip.first()
  },
  data() {
    return {
      tag: true,
      list: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    reverseTag: function() {
      return this.tag ? 1 : -1
    }
  },
  methods: {
    back() {
      if (history.length) {
        history.back()
      } else {
        this.$router.push('/navigation')
      }
    },
    sort() {
      this.tag = !this.tag
      this.list.sort((a, b) => this.reverseTag * (a - b))
      this.$nextTick(() => {
        this.flip.last().play()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flip {
  background-color: cornsilk;
  width: 100%;
  height: 100%;
  .header {
    height: 65px;
    background: #2ea9df;
    .back {
      margin-right: 20px;
      margin-top: calc(65px / 2);
      transform: translateY(-50%);
    }
  }
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding: 10px;
    font-size: 20px;
    .left {
      .list {
        display: flex;
        width: 200px;
        border: 4px solid chartreuse;
        border-radius: 10px;
        flex-direction: column;
        margin: 10px;
        padding: 10px;
        gap: 5px;
        .item {
          &-1 {
            background: #67c23a;
          }
          &-2 {
            background: #ed14c8;
          }
          &-3 {
            background: #f56c6c;
          }
          &-4 {
            background: #3a8ee6;
          }
          &-5 {
            background: #66b1ff;
          }
        }
        div {
          color: white;
          border-radius: 5px;
          text-align: center;
        }
      }
    }
    .right {
      span {
        font-weight: bolder;
      }
    }
  }
}
</style>
