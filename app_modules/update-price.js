//bot здесь не используем, а передаем в parse
const Product = require('../models/Product');
const parse = require('./parse');

async function control(ctx) {
	const created = await Product.find();
	let i = 0;
	//задержка для каждого запуска parse, что бы открывалась только одна копия браузера
	created.forEach(element => {
		i++
		setTimeout(() => {
			const username = element.user; //!!error нет ctx из botprice 96 строка при update-price
			const userId = element.userId;
			// console.log('username-', username);
			// console.log('userId-', userId);
			parse(element.url, ctx, username, userId);
			// console.log(new Date().toLocaleTimeString())
		}, 4000 * i);
	})
};

module.exports = control;