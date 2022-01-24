//bot здесь не используем, а передаем в parse
const Item = require('../models/Item');
const parse = require('./parse');

async function control(bot) {
	const created = await Item.find();
	created.forEach(async element => {
		await parse(element.user, element.nameRequest, element.url, bot)
	});
}

module.exports = control;