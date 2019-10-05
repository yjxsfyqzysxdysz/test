// 修饰符 trim
const mongoose = require('./06_module/db.js')
const TestSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true // 取消前后空格
  },
  age: Number,
  status: {
    type: Number,
    default: 0
  }
})
const TestModal = mongoose.model('test', TestSchema)

const insert = () => {
  const param = new TestModal({
    name: ' 修饰符 无空格 ',
    age: Math.floor(Math.random() * 100),
    status: 6
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