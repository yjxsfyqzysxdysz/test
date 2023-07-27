var self
const Fireworks = function() {
  this.dt = 0
  this.cw = 0
  this.ch = 0
  this.my = 0
  this.mx = 0
  this.oldTime = 0
  this.particles = []
  this.partCount = 30
  this.fireworks = []
  this.currentHue = 170
  this.partSpeed = 5
  this.partSpeedVariance = 10
  this.partWind = 50
  this.partFriction = 5
  this.partGravity = 1
  this.hueMin = 150
  this.hueMax = 200
  this.fworkSpeed = 2
  this.fworkAccel = 4
  this.hueVariance = 30
  this.flickerDensity = 20
  this.showShockwave = false
  this.showTarget = true
  this.clearAlpha = 25
  this.lineWidth = 1
  this.canvas = null
  this.canvasContainer = null
  this.ctx = null
  self = this
  // 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
  window.requestAnimFrame = (() => {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      (a => {
        window.setTimeout(a, 1e3 / 60)
      })
    )
  })()

  this.init()
}

// 随机数
const rand = function(rMi, rMa) {
  return ~~(Math.random() * (rMa - rMi + 1) + rMi)
}

// Create Particles
Fireworks.prototype.createParticles = function(x, y, hue) {
  let i = this.partCount
  while (i--) {
    this.particles.push(new Particle(x, y, hue))
  }
}

// Update Particles
Fireworks.prototype.updateParticles = function() {
  let i = this.particles.length
  while (i--) {
    let p = this.particles[i]
    p.update(i)
  }
}

// Draw Particles
Fireworks.prototype.drawParticles = function() {
  let i = this.particles.length
  while (i--) {
    let p = this.particles[i]
    p.draw()
  }
}

// Create Fireworks
Fireworks.prototype.createFireworks = function(startX, startY, targetX, targetY) {
  this.fireworks.push(new Firework(startX, startY, targetX, targetY))
}

// Update Fireworks
Fireworks.prototype.updateFireworks = function() {
  let i = this.fireworks.length
  while (i--) {
    let p = this.fireworks[i]
    p.update(i)
  }
}

// Draw Fireworks
Fireworks.prototype.drawFireworks = function() {
  let i = this.fireworks.length
  while (i--) {
    let p = this.fireworks[i]
    p.draw()
  }
}

// Events
Fireworks.prototype.bindEvents = function() {
  window.addEventListener('resize', () => {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.ctx.lineCap = 'round'
      this.ctx.lineJoin = 'round'
    }, 100)
  })
  const mousemoveFireworks = function(e) {
    self.mx = e.pageX - self.canvasContainer.offsetLeft
    self.my = e.pageY - self.canvasContainer.offsetTop
    self.currentHue = rand(self.hueMin, self.hueMax)
    self.createFireworks(self.cw / 2, self.ch, self.mx, self.my)
  }
  this.canvas.addEventListener('mousedown', e => {
    this.mx = e.pageX - this.canvasContainer.offsetLeft
    this.my = e.pageY - this.canvasContainer.offsetTop
    this.currentHue = rand(this.hueMin, this.hueMax)
    this.createFireworks(this.cw / 2, this.ch, this.mx, this.my)

    this.canvas.addEventListener('mousemove', mousemoveFireworks)
  })

  this.canvas.addEventListener('mouseup', e => {
    this.canvas.removeEventListener('mousemove', mousemoveFireworks)
  })
}

// Clear Canvas
Fireworks.prototype.clear = function() {
  this.particles = []
  this.fireworks = []
  this.ctx.clearRect(0, 0, this.cw, this.ch)
}

// Delta
Fireworks.prototype.updateDelta = function() {
  const newTime = Date.now()
  this.dt = (newTime - this.oldTime) / 16
  this.dt = this.dt > 5 ? 5 : this.dt
  this.oldTime = newTime
}

// Main Loop
Fireworks.prototype.canvasLoop = function() {
  window.requestAnimFrame(this.canvasLoop.bind(this), this.canvas)
  this.updateDelta()
  this.ctx.globalCompositeOperation = 'destination-out'
  this.ctx.fillStyle = 'rgba(0,0,0,' + this.clearAlpha / 100 + ')'
  this.ctx.fillRect(0, 0, this.cw, this.ch)
  this.ctx.globalCompositeOperation = 'lighter'
  this.updateFireworks()
  this.updateParticles()
  this.drawFireworks()
  this.drawParticles()
}

// 初始化
Fireworks.prototype.init = function() {
  this.dt = 0
  this.oldTime = Date.now()
  this.canvas = document.createElement('canvas')
  this.canvasContainer = document.getElementById('canvas-container')

  this.canvas.width = this.cw = 600
  this.canvas.height = this.ch = 400

  this.particles = []
  this.partCount = 30
  this.fireworks = []
  this.mx = this.cw / 2
  this.my = this.ch / 2
  this.currentHue = 170
  this.partSpeed = 5
  this.partSpeedVariance = 10
  this.partWind = 50
  this.partFriction = 5
  this.partGravity = 1
  this.hueMin = 150
  this.hueMax = 200
  this.fworkSpeed = 2
  this.fworkAccel = 4
  this.hueVariance = 30
  this.flickerDensity = 20
  this.showShockwave = false
  this.showTarget = true
  this.clearAlpha = 25

  this.canvasContainer.appendChild(this.canvas)
  // this.ctx = this.canvas.getContext('2d')
  this.ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
  this.ctx.lineCap = 'round'
  this.ctx.lineJoin = 'round'
  this.lineWidth = 1

  let initialLaunchCount = 10
  while (initialLaunchCount--) {
    setTimeout(() => {
      this.fireworks.push(new Firework(this.cw / 2, this.ch, rand(50, this.cw - 50), rand(50, this.ch / 2) - 50))
    }, initialLaunchCount * 200)
  }
  this.bindEvents()
  this.canvasLoop()

  this.canvas.onselectstart = function() {
    return false
  }
}

// Particle Constructor
const Particle = function(x, y, hue) {
  this.x = x
  this.y = y
  this.coordLast = [
    { x: x, y: y },
    { x: x, y: y },
    { x: x, y: y }
  ]
  this.angle = rand(0, 360)
  this.speed = rand(self.partSpeed - self.partSpeedVariance <= 0 ? 1 : self.partSpeed - self.partSpeedVariance, self.partSpeed + self.partSpeedVariance)
  this.friction = 1 - self.partFriction / 100
  this.gravity = self.partGravity / 2
  this.hue = rand(hue - self.hueVariance, hue + self.hueVariance)
  this.brightness = rand(50, 80)
  this.alpha = rand(40, 100) / 100
  this.decay = rand(10, 50) / 1000
  this.wind = (rand(0, self.partWind) - self.partWind / 2) / 25
  this.lineWidth = self.lineWidth
}

Particle.prototype.update = function(index) {
  const radians = (this.angle * Math.PI) / 180
  const vx = Math.cos(radians) * this.speed
  const vy = Math.sin(radians) * this.speed + this.gravity
  this.speed *= this.friction

  this.coordLast[2].x = this.coordLast[1].x
  this.coordLast[2].y = this.coordLast[1].y
  this.coordLast[1].x = this.coordLast[0].x
  this.coordLast[1].y = this.coordLast[0].y
  this.coordLast[0].x = this.x
  this.coordLast[0].y = this.y

  this.x += vx * self.dt
  this.y += vy * self.dt

  this.angle += this.wind
  this.alpha -= this.decay

  if (this.alpha < 0.05) {
    self.particles.splice(index, 1)
  }
}

Particle.prototype.draw = function() {
  const coordRand = rand(1, 3) - 1
  self.ctx.beginPath()
  self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y))
  self.ctx.lineTo(Math.round(this.x), Math.round(this.y))
  self.ctx.closePath()
  self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')'
  self.ctx.stroke()

  if (self.flickerDensity > 0) {
    const inverseDensity = 50 - self.flickerDensity
    if (rand(0, inverseDensity) === inverseDensity) {
      self.ctx.beginPath()
      self.ctx.arc(Math.round(this.x), Math.round(this.y), rand(this.lineWidth, this.lineWidth + 3) / 2, 0, Math.PI * 2, false)
      self.ctx.closePath()
      self.ctx.fillStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + rand(50, 100) / 100 + ')'
      self.ctx.fill()
    }
  }
}

// Firework Constructor
const Firework = function(startX, startY, targetX, targetY) {
  this.x = startX
  this.y = startY
  this.startX = startX
  this.startY = startY
  this.hitX = false
  this.hitY = false
  this.coordLast = [
    { x: startX, y: startY },
    { x: startX, y: startY },
    { x: startX, y: startY }
  ]
  this.targetX = targetX
  this.targetY = targetY
  this.speed = self.fworkSpeed
  this.angle = Math.atan2(targetY - startY, targetX - startX)
  this.shockwaveAngle = Math.atan2(targetY - startY, targetX - startX) + 90 * (Math.PI / 180)
  this.acceleration = self.fworkAccel / 100
  this.hue = self.currentHue
  this.brightness = rand(50, 80)
  this.alpha = rand(50, 100) / 100
  this.lineWidth = self.lineWidth
  this.targetRadius = 1
}

Firework.prototype.update = function(index) {
  self.ctx.lineWidth = this.lineWidth

  const vx = Math.cos(this.angle) * this.speed
  const vy = Math.sin(this.angle) * this.speed
  this.speed *= 1 + this.acceleration
  this.coordLast[2].x = this.coordLast[1].x
  this.coordLast[2].y = this.coordLast[1].y
  this.coordLast[1].x = this.coordLast[0].x
  this.coordLast[1].y = this.coordLast[0].y
  this.coordLast[0].x = this.x
  this.coordLast[0].y = this.y

  if (self.showTarget) {
    if (this.targetRadius < 8) {
      this.targetRadius += 0.25 * self.dt
    } else {
      this.targetRadius = 1 * self.dt
    }
  }

  if (this.startX >= this.targetX) {
    if (this.x + vx <= this.targetX) {
      this.x = this.targetX
      this.hitX = true
    } else {
      this.x += vx * self.dt
    }
  } else {
    if (this.x + vx >= this.targetX) {
      this.x = this.targetX
      this.hitX = true
    } else {
      this.x += vx * self.dt
    }
  }

  if (this.startY >= this.targetY) {
    if (this.y + vy <= this.targetY) {
      this.y = this.targetY
      this.hitY = true
    } else {
      this.y += vy * self.dt
    }
  } else {
    if (this.y + vy >= this.targetY) {
      this.y = this.targetY
      this.hitY = true
    } else {
      this.y += vy * self.dt
    }
  }

  if (this.hitX && this.hitY) {
    self.createParticles(this.targetX, this.targetY, this.hue)
    self.fireworks.splice(index, 1)
  }
}

Firework.prototype.draw = function() {
  self.ctx.lineWidth = this.lineWidth

  const coordRand = rand(1, 3) - 1
  self.ctx.beginPath()
  self.ctx.moveTo(Math.round(this.coordLast[coordRand].x), Math.round(this.coordLast[coordRand].y))
  self.ctx.lineTo(Math.round(this.x), Math.round(this.y))
  self.ctx.closePath()
  self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + this.alpha + ')'
  self.ctx.stroke()

  if (self.showTarget) {
    self.ctx.save()
    self.ctx.beginPath()
    self.ctx.arc(Math.round(this.targetX), Math.round(this.targetY), this.targetRadius, 0, Math.PI * 2, false)
    self.ctx.closePath()
    self.ctx.lineWidth = 1
    self.ctx.stroke()
    self.ctx.restore()
  }

  if (self.showShockwave) {
    self.ctx.save()
    self.ctx.translate(Math.round(this.x), Math.round(this.y))
    self.ctx.rotate(this.shockwaveAngle)
    self.ctx.beginPath()
    self.ctx.arc(0, 0, 1 * (this.speed / 5), 0, Math.PI, true)
    self.ctx.strokeStyle = 'hsla(' + this.hue + ', 100%, ' + this.brightness + '%, ' + rand(25, 60) / 100 + ')'
    self.ctx.lineWidth = this.lineWidth
    self.ctx.stroke()
    self.ctx.restore()
  }
}

export { Fireworks }
