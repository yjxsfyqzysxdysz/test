const mongoose = require('./db.js')
// 定义数据表（集合）映射
const TestSchema = mongoose.Schema({
  name: {
    type: String
  },
  age: Number,
  status: {
    type: Number,
    default: 0
  }
})

module.exports = TestSchema;