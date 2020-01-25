const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')
const port = process.env.serverPort;

const app = express()
app.use(cors())

app.use(bodyParser.json())

app.use('/api', api)

app.get('/', function(req, res){
	res.send('Hello from Server')
})

app.listen(port, function(){
	console.log('Server running on localhost: ' + port)
})
