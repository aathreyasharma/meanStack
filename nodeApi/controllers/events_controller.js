const auth_controller  = require('./authentication_controller');
const Event = require('../models/event');
const User = require('../models/user');
const { newEventValidation } = require('../services/event-validation_services');

exports.getEvents = async function(req, res) {
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
		},
		{
			"_id" : "5",
			"name" : "Event 5",
			"description" : "Event about something.. Wut??",
			"date" : "2020-05-01T10:00:01.000Z"
		}
	]

	events = await Event.find();
	res.status(200).send(events)
}

exports.specialEvents = function(req, res) {
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
		},
		{
			"_id" : "S5",
			"name" : "Special Event 5",
			"description" : "Special Event about something.. Wut??",
			"date" : "2020-05-01T10:00:01.000Z"
		}
	]
	res.json(events)
}

exports.createEvent = async function(req, res) {
	console.log("Create Post Api:", req.body)
	let eventData = req.body;

	// const { error } = newEventValidation(eventData);

	// if (error) return res.status(400).send(error.details[0].message);

	let event = {
		name: eventData.name,
		description: eventData.description,
		createUser: eventData.uId
	}
	console.log(event);
	try {
		console.log("In Try:",event);
		const newEvent = new Event(event);
		const savedEvent = await newEvent.save();

		let eventObj = {
			eventId: savedEvent._id,
			name: savedEvent.name,
			desc: savedEvent.description,
			createTs: savedEvent.createTs,
			createUser: savedEvent.createUser
		}

		console.log('EventObj : ', eventObj);
		res.status(200).send(eventObj)
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
}

exports.editEvent = async function(req, res) {
	console.log("Edit Event : ",req.body);
}

exports.getEvent = async function(req, res) {
	eId = req.params.id;
	console.log("Get Event by Id : ", eId);
	eventObj = await Event.findOne({_id: eId});
	eventObj['image'] = "img.jpg"
	
	// if (eventObj) {
	res.status(200).send(eventObj);
	// } else {
		// res.status(201).send({"msg":"Requested info unavailable..!"})
	// }
}

exports.deleteEvent = async function(req, res) {
	eventId = req.params.eventId;
	eventObj = await Event.findOne({_id: eventId});
	console.log(eventObj);
	eventObj.delete()
	res.status(200).send({"msg":"deleted"})
}