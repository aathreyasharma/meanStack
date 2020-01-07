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
const db = `mongodb://localhost:${dbPort}/${dbName}`;

mongoose.connect(
	db,
	{useNewUrlParser: true},
	// { useUnifiedTopology: true },
	() => console.log('Connected to DB')

	);

const auth_controller = require('../controllers/authentication_controller');
const event_controller = require('../controllers/events_controller');

router.get('/', (req, res) => {
	res.send("From API route")
})

router.post('/register', auth_controller.register);

router.post('/login', auth_controller.login);

router.get('/events', event_controller.events);

router.get('/special', auth_controller.verifyToken, event_controller.specialEvents);

module.exports = router
