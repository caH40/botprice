// запрос всех отслеживаемых товаров
// принимает функция ctx и username
const Product = require('../models/Product');

async function requestProducts(bot, username) {
	const created = await Product.find({ user: username });
	let post = '';
	created.forEach(async element => {
		post = post + `${element.nameRequest} - ${element.price}€\n<a href="${element.url}">${element.domainName}</a>\n\n`;
	});
	const notNull = post ? post : 'Вы не отслеживаете цены на велотовары.';
	await bot.reply(notNull, { parse_mode: 'html', disable_web_page_preview: true });
}

module.exports = requestProducts