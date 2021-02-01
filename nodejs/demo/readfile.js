const Fs = require('fs')

Fs.readFile('nodejs/demo/README.md', 'utf-8', function (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
})

console.log('end.')
