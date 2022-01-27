//bot здесь не используем, а передаем в parse
const Product = require('../models/Product');
const parse = require('./parse');

const millisecondsInFiveSecond = 5000;

async function control(ctx) {
	try {
		const created = await Product.find();
		let i = 0;
		//задержка для каждого запуска parse, что бы открывалась только одна копия браузера
		created.forEach(element => {
			i++
			setTimeout(() => {
				const username = element.user;
				const userId = element.userId;
				parse(element.url, ctx, username, userId);
			}, millisecondsInFourSecond * i);
		})
	} catch (error) {
		console.log(error);
	}
};

module.exports = control;