const mongoose = require('./db.js')
// 定义数据表（集合）映射
const netModal = mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  pic: {
    type: String,
    trim: true
  },
  redirect: {
    type: String
  }
})

module.exports = netModal;