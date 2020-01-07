const auth_controller  = require('./authentication_controller');

exports.events = function(req, res) {
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
	res.json(events)
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