// запрос всех отслеживаемых товаров
// принимает функция ctx и username
const Product = require('../models/Product');

async function requestProducts(ctx, username) {
	const created = await Product.find({ user: username });
	let post = '';
	created.forEach(async element => {
		let elementPriceLength = element.prices.length;
		let x = element.prices[elementPriceLength - 1].price; //цена в последнем элементе массива
		post = post + `${element.nameRequest} - ${x}€\n<a href="${element.url}">${element.domainName}</a>\n\n`;
	});
	const notNull = post ? post : 'Вы не отслеживаете цены на велотовары.';
	await ctx.reply(notNull, { parse_mode: 'html', disable_web_page_preview: true });
}

module.exports = requestProducts