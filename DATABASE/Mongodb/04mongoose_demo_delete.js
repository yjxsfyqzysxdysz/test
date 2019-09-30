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

// 删除
Test.deleteOne({ "_id": "5d91ce61d9879944dc5a2c29" }, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('success', res)
});
