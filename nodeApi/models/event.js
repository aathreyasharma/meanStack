const mongoose = require('mongoose')

const Event = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	locationName: {
		type: String
	},
	coordinates: {
		type: Array
	},
	image : {
		type: String
	},
	createTs: {
		type: Date,
		default: Date.now
	},
	modTs: {
		type: Date,
		default: Date.now
	},
	createUser: {
		type: String
	}
});

module.exports = mongoose.model('Event', Event);