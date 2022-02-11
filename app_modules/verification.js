require('dotenv').config;
const Product = require('../models/Product');
const { messageBadUrl, messageNeedUsername } = require('./text');

async function verification(url, username, ctx) {
	try {
		//если нет username у пользователя, то сервис не доступен
		if (!username) {
			await ctx.reply(messageNeedUsername);
			return false
		}
		//если товар уже в базе отслеживания, то выдается сообщение
		const product = await Product.findOne({ url: url, user: username });
		if (product) {
			const priceLength = product.prices.length;
			await ctx.reply(`Вы уже отслеживаете данную позицию!\n${product.nameRequest}.\nТекущая цена ${product.prices[priceLength - 1].price}${product.currency}.`);
			return false
		}
		// проверка количества отслеживаемых велотоваров, можно не больше 10
		const productArr = await Product.find({ user: username });
		const productArrLength = productArr.length;
		if (productArrLength > 9 && productArr[0].userId != process.env.MY_TELEGRAM_ID) {
			await ctx.reply('К сожалению, можно отслеживать не более 10ти позиций.');
			return false
		}

		// const domainName = url.match(/https:\/\/(.*?)\//);
		// проверка наличия названий сайтов для мониторинга в url
		let condition = false;
		const site = ['bike-components', 'bike-discount', 'chainreactioncycles', 'aliexpress.ru', 'citilink.ru'];
		site.forEach(element => {
			condition = condition || url.includes(element);
		})
		// если нет разрешенных сайтов в url, то сообщение
		if (condition) {
			return true
		} else {
			const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
			await ctx.reply(messageBadUrl, htmlDisPrev);
			return false
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = verification;