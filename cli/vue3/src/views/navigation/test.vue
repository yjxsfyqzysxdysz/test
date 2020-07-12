<template>
  <div class="test">
    <div class="box" :style="{'margin-left': `-${left}px`}">
      <div class="item" v-for="(e, i) of num" :key="i">{{i}}</div>
    </div>
    <div class="btn">
      <button class="left" @click="clickItme(1)">&lt;</button>
      <button class="right" @click="clickItme(0)">&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 10,
      index: 0,
      timer: 0
    }
  },
  computed: {
    left: function() {
      return this.index * 100
    }
  },
  methods: {
    clickItme(index) {
      if (this.index < (this.num - 1) && !index) {
        this.index++
      } else if (this.index && index) {
        this.index--
      }
    },
    once() {
      if (!this.timer) {
        this.timer = new Date().getTime()
        const t = setTimeout(() => {
          if (this.timer + 1e3 >= new Date().getTime()) {
            clearTimeout()
          }
        }, 1e3)
      }
    }
  }
}
</script>

<style>
.test {
  width: 100px;
  height: 100px;
  border: 1px solid;
  overflow: hidden;
  position: relative;
}
.box {
  width: 1000px;
  background: red;
  display: flex;
  transition: all 0.5s linear 0s;
}
.item {
  width: 100px;
  height: 100px;
  background: #ccc;
}
.btn {
  margin-top: -30px;
}
.left,.right {
  width: 10px;
  height: 10px;
  font-size: 5px;
}
.right {

}
</style>