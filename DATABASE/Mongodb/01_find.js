// 引入mongoose
const mongoose = require('mongoose');

// 建立连接
mongoose.connect('mongodb://localhost:27017/test');

// 创建schema
// Schema 需要与数据库一一对应
let UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: Boolean
})

// 定义模型——操作数据表
let Test = mongoose.model('Test', UserSchema, 'Tests');

// 查询数据
Test.find({}, function (err, res) {
  if (err) {
    console.log(err)
    return
  }
  console.log(res)
})
