//bot здесь не используем, а передаем в parse
const Product = require('../models/Product');
const parse = require('./parse');

async function control(bot) {
	const created = await Product.find();
	created.forEach(async element => {
		await parse(element.user, element.url, bot)
	});
}

module.exports = control;