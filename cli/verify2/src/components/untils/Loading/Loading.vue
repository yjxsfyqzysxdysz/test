<template>
  <div class="loadingBox">
    <ul class="g-circles" :style="scaleFun">
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
      <li :style="{ backgroundColor: colorType === 'blueColor' ? '#007dff' : '#fff' }" class="circle"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'loadingBox',
  props: {
    loadingZoom: {
      type: String,
      default: '1'
    },
    colorType: {
      type: String,
      default: 'whiteColor'
    }
  },
  computed: {
    scaleFun() {
      return `transform: scale(${this.loadingZoom}, ${this.loadingZoom})`
    }

  }
}
</script>

<style lang="scss" scoped>
.loadingBox {
  ul,
  li {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  ul {
    position: relative;
    transform: scale(0.9) translate(7px, 7px);
    -ms-transform: scale(0.9) translate(7px, 7px);
    -webkit-transform: scale(0.9) translate(7px, 7px);
  }
  li {
    width: 14px;
    height: 14px;
    line-height: 20px;
    text-align: center;
    margin-top: 5px;
    margin-left: -20px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    opacity: 0.1;
    animation: opacity 1.2s linear infinite;
    -ms-animation: opacity 1.2s linear infinite;
    -webkit-animation: opacity 1.2s linear infinite;
    &:nth-of-type(1) {
      transform: rotate(-36deg);
      transform-origin: 20px 40px;
      animation-delay: -0.1s;
    }
    &:nth-of-type(2) {
      transform: rotate(-72deg);
      transform-origin: 20px 40px;
      animation-delay: -0.2s;
    }
    &:nth-of-type(3) {
      transform: rotate(-108deg);
      transform-origin: 20px 40px;
      animation-delay: -0.3s;
    }
    &:nth-of-type(4) {
      transform: rotate(-144deg);
      transform-origin: 20px 40px;
      animation-delay: -0.4s;
    }
    &:nth-of-type(5) {
      transform: rotate(-180deg);
      transform-origin: 20px 40px;
      animation-delay: -0.5s;
    }
    &:nth-of-type(6) {
      transform: rotate(144deg);
      transform-origin: 20px 40px;
      animation-delay: -0.6s;
    }
    &:nth-of-type(7) {
      transform: rotate(108deg);
      transform-origin: 20px 40px;
      animation-delay: -0.7s;
    }
    &:nth-of-type(8) {
      transform: rotate(72deg);
      transform-origin: 20px 40px;
      animation-delay: -0.8s;
    }
    &:nth-of-type(9) {
      transform: rotate(36deg);
      transform-origin: 20px 40px;
      animation-delay: -0.9s;
    }
    &:nth-of-type(10) {
      transform: rotate(0deg);
      transform-origin: 20px 40px;
      animation-delay: -1s;
    }
  }
  @keyframes opacity {
    3% {
      opacity: 1;
    }
    75% {
      width: 8px;
      height: 8px;
      opacity: 0.6;
    }
  }
}
</style>
