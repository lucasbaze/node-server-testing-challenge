const express = require('express');
const server = express();
const snacks = require("./data");

server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).send("got the request!");
})

server.get('/snacks', (req, res) => {
	res.json(snacks);
})

server.post('/snacks', (req, res) => {
	let snack = req.body;
})

//server.listen(8080, () => console.log('listening on 8080'));

module.exports = server;