const request = require('supertest');
const server = require('./index');
//const snacks = require('./data');

describe("Get /", () => {
	test('Server is running accordingly', async () => {
		let res = await request(server).get('/');
		expect(res.status).toBe(200)
	});

	test('returns "got the message"', async () => {
		let res = await request(server).get('/');
		expect(res.text).toEqual('got the request!');
	});

	// test('returns "got the message"', async () => {
	// 	let res = await request(server).get('/');
	// 	console.log(res.info); //false
	// 	console.log(res.type); //application/json, text/html
	// 	console.log(res.unauthorized); //false
	// })
});

describe('CRUD /snacks', () => {
	test('DB starts with 4 snacks', async () => {
		let res = await request(server).get('/snacks');
		expect(res.body).toHaveLength(4);
		expect(res.status).toBe(200);
	});
	
	test('Post snacks Success', async () => {
		let res = await request(server).post('/snacks').send({name: 'Coca-Cola', quantity: 3, uom: 'cans'});
		expect(res.body).toHaveLength(5);
	});

	test('Post Snacks Failure', async () => {
		let res = await request(server).post('/snacks').send({ quantity: 4, uom: 'oz' });
		expect(res.status).toBe(500);
	})

	test('Delete Snacks', async() => {
		let res = await request(server).delete('/snacks/4');
		expect(res.body).toHaveLength(4);
	})

	test('Snacks is back to start', async () => {
		let res = await request(server).get('/snacks');
		expect(res.body).toStrictEqual([
			{
				id: 0,
				name: 'Almonds',
				quantity: 4,
				uom: 'oz',
			},
			{
				id: 1,
				name: 'Cheetos',
				quantity: 2,
				uom: 'bags',
			},
			{
				id: 2,
				name: 'Cheese Sticks',
				quantity: 10,
				uom: 'sticks',
			},
			{
				id: 3,
				name: 'Queso',
				quantity: 1,
				uom: 'jar',
			}
		]);
	})

});