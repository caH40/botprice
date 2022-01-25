//bot здесь не используем, а передаем в parse
const Product = require('../models/Product');
const parse = require('./parse');

async function control(bot) {
	const created = await Product.find();
	let i = 0;
	//задержка для каждого запуска parse, что бы открывался только одна копия браузера
	created.forEach(element => {
		i++
		setTimeout(() => {
			parse(element.user, element.url, bot);
			// console.log(new Date().toLocaleTimeString())
		}, 4000 * i);
	})
};

module.exports = control;
