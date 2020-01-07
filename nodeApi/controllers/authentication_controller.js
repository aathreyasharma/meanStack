const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../services/validation_services');
const secretKey = process.env.secretKey;
const saltRounds = parseInt(process.env.saltRounds);

exports.register = async function(req, res) {
	console.log('Register Api:', req.body)
	let userData = req.body;
	
	// Check if data is valid by passing the received data validation service
	const { error } = registerValidation(userData);

	// If error, send the error message as a response
	if (error) return res.status(400).send(error.details[0].message);

	// Check if  email already exists
	const emailExists = await User.findOne({email: userData.email});
	
	// If email already exists, Send an appropriate message
	if (emailExists) return res.status(400).send("Email already exists..!!");

	// If not error and email doesnt exist in the database, create a new user
	// Hash the password
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(userData.password, salt);

	// Create a new user object from the model
	userData.password = hashedPassword;

	// console.log(newUserObj);
	try {
		const newUserObj = new User(userData);
		const savedUser = await newUserObj.save();
		// create payload
		let payload = { uId: savedUser._id };
		// Use payload to create a jwt and send jwt
		let token = jwt.sign(payload, secretKey);
		
		let uObj = {
			name: savedUser.name,
			email: savedUser.email,
			auth_token: token
		}
		console.log('uobj',uObj);
		res.status(200).send(uObj);
	} catch(err) {
		console.log(err)
		res.status(400).send(err);
	}
}

exports.login = async function(req, res) {
	console.log('Login Api:', req.body)
	let userData = req.body;

	const { error } = loginValidation(userData);
	if (error) return res.status(400).send(error.details[0].message);

	const user = await User.findOne({email: userData.email});
	if (!user) return res.status(400).send({desc: "Email doesn't exist..!!"});

	const validPass = await bcrypt.compare(userData.password, user.password);

	if (!validPass) return res.status(400).send({desc: "Email/Password incorrect.."});

	let payload = {uId: user._id};
	let token = jwt.sign(payload, secretKey);
	uObj = {
		name: user.name,
		email: user.email,
		auth_token: token
	}
	res.status(200).send(uObj);
}

exports.verifyToken = function(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).send('Unauthorized request')
	}
	let token = req.headers.authorization.split(' ')[1]
	if (token === 'null') {
		return res.status(401).send('Unauthorized request')
	}
	let payload = jwt.verify(token, secretKey);
	if (!payload) {
		return res.status(401).send('Unauthorized request')
	}
	req.userId = payload.uId
	next()
}