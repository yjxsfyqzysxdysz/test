<template>
  <div class="fireworks">
    <div id="gui"></div>
    <div id="canvas-container">
      <div id="mountains2"></div>
      <div id="mountains1"></div>
      <div id="skyline"></div>
    </div>
  </div>
</template>

<script>
import * as dat from 'dat.gui'
import { Fireworks } from './fireworks'

export default {
  name: 'fireworks',
  mounted() {
    /*=============================================================================*/
    /* GUI
    /*=============================================================================*/
    const guiPresets = {
      "preset": "Default",
      "remembered": {
        "Default": {
          "0": {
            "fworkSpeed": 2,
            "fworkAccel": 4,
            "showShockwave": false,
            "showTarget": true,
            "partCount": 30,
            "partSpeed": 5,
            "partSpeedVariance": 10,
            "partWind": 50,
            "partFriction": 5,
            "partGravity": 1,
            "flickerDensity": 20,
            "hueMin": 150,
            "hueMax": 200,
            "hueVariance": 30,
            "lineWidth": 1,
            "clearAlpha": 25
          }
        },
        "Anti Gravity": {
          "0": {
            "fworkSpeed": 4,
            "fworkAccel": 10,
            "showShockwave": true,
            "showTarget": false,
            "partCount": 150,
            "partSpeed": 5,
            "partSpeedVariance": 10,
            "partWind": 10,
            "partFriction": 10,
            "partGravity": -10,
            "flickerDensity": 30,
            "hueMin": 0,
            "hueMax": 360,
            "hueVariance": 30,
            "lineWidth": 1,
            "clearAlpha": 50
          }
        },
        "Battle Field": {
          "0": {
            "fworkSpeed": 10,
            "fworkAccel": 20,
            "showShockwave": true,
            "showTarget": true,
            "partCount": 200,
            "partSpeed": 30,
            "partSpeedVariance": 5,
            "partWind": 0,
            "partFriction": 5,
            "partGravity": 0,
            "flickerDensity": 0,
            "hueMin": 20,
            "hueMax": 30,
            "hueVariance": 10,
            "lineWidth": 1,
            "clearAlpha": 40
          }
        },
        "Mega Blast": {
          "0": {
            "fworkSpeed": 3,
            "fworkAccel": 3,
            "showShockwave": true,
            "showTarget": true,
            "partCount": 500,
            "partSpeed": 50,
            "partSpeedVariance": 5,
            "partWind": 0,
            "partFriction": 0,
            "partGravity": 0,
            "flickerDensity": 0,
            "hueMin": 0,
            "hueMax": 360,
            "hueVariance": 30,
            "lineWidth": 20,
            "clearAlpha": 20
          }
        },
        "Nimble": {
          "0": {
            "fworkSpeed": 10,
            "fworkAccel": 50,
            "showShockwave": false,
            "showTarget": false,
            "partCount": 120,
            "partSpeed": 10,
            "partSpeedVariance": 10,
            "partWind": 100,
            "partFriction": 50,
            "partGravity": 0,
            "flickerDensity": 20,
            "hueMin": 0,
            "hueMax": 360,
            "hueVariance": 30,
            "lineWidth": 1,
            "clearAlpha": 80
          }
        },
        "Slow Launch": {
          "0": {
            "fworkSpeed": 2,
            "fworkAccel": 2,
            "showShockwave": false,
            "showTarget": false,
            "partCount": 200,
            "partSpeed": 10,
            "partSpeedVariance": 0,
            "partWind": 100,
            "partFriction": 0,
            "partGravity": 2,
            "flickerDensity": 50,
            "hueMin": 0,
            "hueMax": 360,
            "hueVariance": 20,
            "lineWidth": 4,
            "clearAlpha": 10
          }
        },
        "Perma Trail": {
          "0": {
            "fworkSpeed": 4,
            "fworkAccel": 10,
            "showShockwave": false,
            "showTarget": false,
            "partCount": 150,
            "partSpeed": 10,
            "partSpeedVariance": 10,
            "partWind": 100,
            "partFriction": 3,
            "partGravity": 0,
            "flickerDensity": 0,
            "hueMin": 0,
            "hueMax": 360,
            "hueVariance": 20,
            "lineWidth": 1,
            "clearAlpha": 0
          }
        }
      },
      "closed": true,
      "folders": {
        "Fireworks": {
          "preset": "Default",
          "closed": false,
          "folders": {}
        },
        "Particles": {
          "preset": "Default",
          "closed": true,
          "folders": {}
        },
        "Color": {
          "preset": "Default",
          "closed": true,
          "folders": {}
        },
        "Other": {
          "preset": "Default",
          "closed": true,
          "folders": {}
        }
      }
    };
    const fworks = new Fireworks();
    const gui = new dat.GUI({
      autoPlace: false,
      load: guiPresets,
      preset: 'Default'
    });
    document.getElementById('gui').appendChild(gui.domElement)

    var guiFireworks = gui.addFolder('Fireworks');
    guiFireworks.add(fworks, 'fworkSpeed').min(1).max(10).step(1);
    guiFireworks.add(fworks, 'fworkAccel').min(0).max(50).step(1);
    guiFireworks.add(fworks, 'showShockwave');
    guiFireworks.add(fworks, 'showTarget');

    var guiParticles = gui.addFolder('Particles');
    guiParticles.add(fworks, 'partCount').min(0).max(500).step(1);
    guiParticles.add(fworks, 'partSpeed').min(1).max(100).step(1);
    guiParticles.add(fworks, 'partSpeedVariance').min(0).max(50).step(1);
    guiParticles.add(fworks, 'partWind').min(0).max(100).step(1);
    guiParticles.add(fworks, 'partFriction').min(0).max(50).step(1);
    guiParticles.add(fworks, 'partGravity').min(-20).max(20).step(1);
    guiParticles.add(fworks, 'flickerDensity').min(0).max(50).step(1);

    var guiColor = gui.addFolder('Color');
    guiColor.add(fworks, 'hueMin').min(0).max(360).step(1);
    guiColor.add(fworks, 'hueMax').min(0).max(360).step(1);
    guiColor.add(fworks, 'hueVariance').min(0).max(180).step(1);

    var guiOther = gui.addFolder('Other');
    guiOther.add(fworks, 'lineWidth').min(1).max(20).step(1);
    guiOther.add(fworks, 'clearAlpha').min(0).max(100).step(1);
    guiOther.add(fworks, 'clear').name('Clear');

    gui.remember(fworks);
  },
  data() {
    return {

    }
  },
  methods: {
  },
  beforeDestroy() {

  }
}
</script>

<style lang="scss" scoped>
.fireworks {
  width: 100%;
  height: 100%;
  background: #171717;
  a {
    color: #2fa1d6;
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    color: #fff;
  }

  #canvas-container {
    background: #000 url(https://jackrugile.com/lab/fireworks-v2/images/bg.jpg);
    height: 400px;
    left: 50%;
    margin: -200px 0 0 -300px;
    position: absolute;
    top: 50%;
    width: 600px;
    z-index: 2;
  }

  canvas {
    cursor: crosshair;
    display: block;
    position: relative;
    z-index: 3;
  }

  canvas:active {
    cursor: crosshair;
  }

  #skyline {
    background: url(https://jackrugile.com/lab/fireworks-v2/images/skyline.png)
      repeat-x 50% 0;
    bottom: 0;
    height: 135px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  #mountains1 {
    background: url(https://jackrugile.com/lab/fireworks-v2/images/mountains1.png)
      repeat-x 40% 0;
    bottom: 0;
    height: 200px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  #mountains2 {
    background: url(https://jackrugile.com/lab/fireworks-v2/images/mountains2.png)
      repeat-x 30% 0;
    bottom: 0;
    height: 250px;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 1;
  }

  #gui {
    right: 0;
    position: fixed;
    top: 0;
    z-index: 3;
  }
}
</style>
