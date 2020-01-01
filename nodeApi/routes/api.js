const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

const saltRounds = process.env.saltRounds;

const serverPort = parseInt(process.env.serverPort);
const dbPort=parseInt(process.env.dbPort);
const host = process.env.host;
const dbName = 'angularAuth'

const router = express.Router();
const db = `mongodb://${host}:${dbPort}/${dbName}`;

mongoose.connect(
	db,
	{useNewUrlParser: true},
	// { useUnifiedTopology: true },
	() => console.log('Connected to DB')

	);


function verifyToken(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).send('Unauthorized request')
	}
	let token = req.headers.authorization.split(' ')[1]
	if (token === 'null') {
		return res.status(401).send('Unauthorized request')
	}
	let payload = jwt.verify(token, 'secretKey');
	if (!payload) {
		return res.status(401).send('Unauthorized request')
	}
	req.userId = payload.subject
	next()
}

router.get('/', (req, res) => {
	res.send("From API route")
})

router.post('/register', (req, res) => {
	let userData = req.body;
	console.log('Register Api:', userData)
	User.findOne({email: userData.email}, (error, user) => {
		if (error) {
			console.log(error)
			console.log(error)
		} else if (user) {
			console.log(user)
			res.status(200).send('Email already exists')
		} else {
			console.log("creating new user")

			let newUser = new User(userData);
			newUser.save((err, newUser) => {
				if (err) {
					console.log(err)
				} else {
					let payload = { subject: newUser._id }
					let token = jwt.sign(payload, 'secterKey')
					console.log('RegisterToken', token)
					res.status(200).send({token})
				}
			})
		}
	})
})

router.post('/login', function(req, res){
	let userData = req.body;
	console.log('Login Api:', userData)
	User.findOne({email: userData.email}, (error, user) => {
		if(error) {
			console.log(error)
		} else {
			if(!user) {
				res.send('Invalid email')
			} else if (user.password !== userData.password) {
				res.send('Invalid Password')
			} else {
				let payload = {subject: user._id}
				let token = jwt.sign(payload, 'secretKey')
				console.log('LoginToken', token)
				res.status(200).send({token})
			}
		}
	})
})

router.get('/events', (req, res) => {
	let events = [
	{
		"_id" : "1",
		"name" : "Event 1",
		"description" : "Event about something",
		"date" : "2020-01-01T00:00:01.000Z"
	},
	{
		"_id" : "2",
		"name" : "Event 2",
		"description" : "Event about something else",
		"date" : "2020-01-01T00:10:01.000Z"
	},
	{
		"_id" : "3",
		"name" : "Event 3",
		"description" : "Event about something shit",
		"date" : "2020-01-01T00:01:01.000Z"
	},
	{
		"_id" : "4",
		"name" : "Event 4",
		"description" : "Event about something.. Wut??",
		"date" : "2020-01-01T10:00:01.000Z"
	}
	]
	res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
	let events = [
	{
		"_id" : "S1",
		"name" : "Special Event 1",
		"description" : "Special Event about something",
		"date" : "2020-01-01T00:00:01.000Z"
	},
	{
		"_id" : "S2",
		"name" : "Special Event 2",
		"description" : "Special Event about something else",
		"date" : "2020-01-01T00:10:01.000Z"
	},
	{
		"_id" : "S3",
		"name" : "Special Event 3",
		"description" : "Special Event about something shit",
		"date" : "2020-01-01T00:01:01.000Z"
	},
	{
		"_id" : "S4",
		"name" : "Special Event 4",
		"description" : "Special Event about something.. Wut??",
		"date" : "2020-01-01T10:00:01.000Z"
	}
	]
	res.json(events)
})

module.exports = router
