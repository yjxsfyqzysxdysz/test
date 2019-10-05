const mongoose = require('./db.js')
const TestSchema = require('./testModal')

// 定义model 操作数据库
const TestModal = mongoose.model('test', TestSchema)

module.exports = TestModal