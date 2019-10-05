const mongoose = require('./db.js')
const netSchema = require('./netModal')

// 定义model 操作数据库
const NetModal = mongoose.model('net', netSchema)

module.exports = NetModal