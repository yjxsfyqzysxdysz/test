const EventEmitter = require('events').EventEmitter

const event = new EventEmitter()

event.on('some_event', function () {
  console.log('some_event occured.')
})

console.log('start')

setTimeout(() => {
  event.emit('some_event')
}, 1e3)

console.log('end')
