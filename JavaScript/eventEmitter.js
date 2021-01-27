class EventEmitter {
  constructor() {
    this.event = new Map()
  }
  get length() {
    return this.siez()
  }
  on(event, callback) {
    if (this.event.has(event)) {
      this.event.set(event, [...this.get(event), callback])
    } else {
      this.event.set(event, [callback])
    }
    return this
  }
  emit(event, ...arg) {
    if (this.has(event)) {
      this.get(event).forEach(e => {
        e && e.apply(null, arg)
      })
    }
    return this
  }
  get(event) {
    return this.event.get(event)
  }
  has(event) {
    return this.event.has(event)
  }
  off(event, callback) {
    if (this.has(event)) {
      if (callback) {
        this.event.set(
          event,
          this.get(event).filter(e => e != callback)
        )
      } else {
        this.event.delete(event)
      }
    }
    return this
  }
  siez() {
    return this.event.size()
  }
  then(callback) {
    callback && callback()
    return this
  }
}

let eventEmitter = new EventEmitter()
let log = function () {
  console.log(11111)
}
eventEmitter
  .on('click', val => {
    console.log('asdfghjk', val)
  })
  .on('click', log)
  .on('click', val => {
    console.log('12323', val)
  })

eventEmitter.emit('click', '1234567890')
console.log(eventEmitter.get('click'))
eventEmitter.off('click', log)
console.log(eventEmitter.get('click'))
eventEmitter.emit('click', '+++')
