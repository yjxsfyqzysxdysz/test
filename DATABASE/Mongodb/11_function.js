// 自定义封装方法

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

// 静态方法
TestSchema.statics.findAge = function (age, req) {
  this.find({
    age
  }, (err, res) => {
    req(err, res)
  })
}

// 实例方法   (基本不用)
TestSchema.methods.print = function () {
  console.log('我是一个实例方法')
}


const TestModal = mongoose.model('test', TestSchema)

const find = () => {
  TestModal.findAge(20, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(res)
  })
}
// find()

const insert = () => {
  let params = new TestModal({
    name: 'ceshi',
    age: Math.floor(Math.random() * 100),
    status: 2
  })
  params.print()
}
insert()