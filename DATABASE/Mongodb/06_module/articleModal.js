const mongoose = require('./db.js')

const ArticleSchema = mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	cid: {
		type: mongoose.Types.ObjectId,
		ref: 'articlecate' //cid和 文章分类建立关系。   model    
	},
	author_id: {
		type: mongoose.Types.ObjectId,
		ref: "user" //author_id和 用户表建立关系。   model
	},
	descripton: String,
	content: String
})

module.exports = ArticleSchema