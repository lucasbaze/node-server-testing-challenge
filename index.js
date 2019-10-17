const express = require('express');
const server = express();
let snacks = require("./data");

server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).send("got the request!");
})

server.get('/snacks', (req, res) => {
	res.json(snacks);
})

server.post('/snacks', (req, res, next) => {
	let snack = req.body;
	if(!snack || !snack.name){
		res.status(500).json({ message: "Snack needs a name!"});
		
	}else {
		let id = snacks.length;
		snacks.push({ id, ...snack });
		res.status(200).json(snacks);
	}
})

server.delete('/snacks/:id', (req, res) => {
	console.log(snacks);
	let {id} = req.params;
	let index = snacks.findIndex(snack => snack.id == id);
	let first = snacks.slice(0, index);
	let last = snacks.slice(index + 1);
	snacks = [...first, ...last];
	console.log(snacks);
	res.status(200).json(snacks);
})

//server.listen(8080, () => console.log('listening on 8080'));

module.exports = server;