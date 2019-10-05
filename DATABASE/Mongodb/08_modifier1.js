// 修饰符
const TestModal = require('./06_module/test.js')
const insert = () => {
  const param = new TestModal({
    name: ' 修饰符 有空格 ',
    age: Math.floor(Math.random() * 100),
    status: 5
  })
  param.save((err) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('新建成功')
  })
}
insert()