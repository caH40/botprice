// запрос всех отслеживаемых товаров
// принимает функция ctx и username
const Product = require('../models/Product');

async function requestProducts(ctx, username) {
	try {
		const created = await Product.find({ user: username });
		let post;
		let elementPriceLength;
		let priceLast;
		created.forEach(async element => {
			elementPriceLength = element.prices.length;
			priceLast = element.prices[elementPriceLength - 1].price; //цена в последнем элементе массива
			post = post + `${element.nameRequest} - ${priceLast}${element.currency}\n<a href="${element.url}">${element.domainName}</a>\n\n`;
		});
		const notNull = post ? post : 'Вы не отслеживаете цены на велотовары.';
		await ctx.reply(notNull, { parse_mode: 'html', disable_web_page_preview: true });
	} catch (error) {
		console.log(error);
	}
}

module.exports = requestProducts