const mongoose = require('mongoose')

// const Schema = mongoose.Schema
const user = new mongoose.Schema({
	email: String,
	password : String
})

module.exports = mongoose.model('User', user, 'users')
