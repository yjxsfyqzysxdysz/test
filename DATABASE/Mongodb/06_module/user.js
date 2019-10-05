const mongoose = require('./db.js')

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	name: String,
	age: Number,
	sex: String,
	tel: Number,
	status: {
		type: Number,
		default: 1
	}
})

module.exports = mongoose.model('user', UserSchema, 'user')