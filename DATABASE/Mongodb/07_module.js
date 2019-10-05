const TestModal = require('./06_module/test.js')

const find = () => {
  TestModal.find({}, (err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log(res)
    }
  })
}
// find()

const insert = () => {
  const param = TestModal({
    name: 'asdfghjkl',
    age: Math.floor(Math.random() * 100),
    status: 1
  })
  param.save((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('新建成功')
  })
}
// insert()