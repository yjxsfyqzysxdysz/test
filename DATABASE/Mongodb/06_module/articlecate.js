const mongoose = require('./db.js')

const ArticleCateSchema = mongoose.Schema({
	title: {
		type: String,
		unique: true
	},
	descripton: String,
	addtime: {
		type: Date
	}
})


module.exports = mongoose.model('articlecate', ArticleCateSchema, 'articlecate')