function readFileCallBack(err, data) {
  if (err) {
    console.error(err)
  } else {
    console.log(data)
  }
}

const fs = require('fs')

fs.readFile('./nodejs/demo/README.md', 'utf-8', readFileCallBack)

console.log('end.')
