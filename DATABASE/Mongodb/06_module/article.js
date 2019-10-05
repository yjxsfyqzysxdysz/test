const mongoose = require('./db.js')
const ArticleSchema = require('./articleModal')

const ArticleModal = mongoose.model('article', ArticleSchema, 'article')

module.exports = ArticleModal