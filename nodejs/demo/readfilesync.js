const fs = require('fs')

const data = fs.readFileSync('./nodejs/demo/README.md', 'utf-8')

console.log(data)
console.log('end.')
