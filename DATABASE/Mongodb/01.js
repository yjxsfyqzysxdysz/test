const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
let UserSchema = mongoose.Schema({
  name: String,
  age: Number,
  status: 'number'
})

let Test = mongoose.model('Test', UserSchema);

let T = new Test({ //实例化模型 传入增加的数据
  name: 'lisi2222333',
  age: 20,
  status: true
})
// T.save();

Test.updateOne({
  name: 'lisi2222333'
}, {
  name: '哈哈哈'
}, function (err, res) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('成功')
});