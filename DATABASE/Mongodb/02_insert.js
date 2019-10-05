// 引入mongoose
const mongoose = require('mongoose');

// 建立连接
mongoose.connect('mongodb://localhost:27017/test');

// 创建schema
// Schema 需要与数据库一一对应
let UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  sex: Boolean
})

// 定义模型——操作数据表
let Test = mongoose.model('test', UserSchema);

// 增加数据
let params = new Test({
  name: 'ceshi',
  age: Math.floor(Math.random() * 100),
  status: false
})
params.save(function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('success')
})
