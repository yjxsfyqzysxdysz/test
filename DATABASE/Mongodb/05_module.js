// 引入mongoose
const mongoose = require('mongoose');

// 建立连接
// useNewUrlParser这个属性会在url里识别验证用户所需的db,未升级前是不需要指定的,升级到一定要指定。
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.error('数据库连接失败:', err)
  } else {
    console.log('数据库连接成功')
  }
});

// 定义数据表（集合）映射
const TestSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: {
    type: Number,
    default: 0
  }
})

// 定义model 操作数据库
const TestModal = mongoose.model('test', TestSchema)

// 查找
let find = () => {
  TestModal.find({}, (err, res) => {
    if (err) {
      console.error(err)
    } else {
      console.log(res)
    }
  })
}
// find()

// 新增
let insert = () => {
  let param = new TestModal({
    name: 'lalalala',
    age: Math.floor(Math.random() * 100)
  })
  param.save((err) => {
    if (err) {
      console.log('新建失败')
    } else {
      console.log('新建成功')
    }
  })
}
// insert()