const Product = require('../models/Product');

async function verification(url, username, ctx) {
	try {
		const product = await Product.findOne({ url: url, user: username });
		if (product) {
			const priceLength = product.prices.length;
			if (priceLength !== 1) {
				await ctx.reply(`
				Вы уже отслеживаете данную позицию!\n${product.nameRequest}.\nТекущая цена ${product.prices[priceLength - 1].price}${product.currency}.`);
			} else {
				await ctx.reply('Вы недавно добавили этот велотовар, цена не обновлялась!')
			}
		}
		// проверка количества отслеживаемых велотоваров, можно не больше 10
		const productArr = await Product.find({ user: username });
		const productArrLength = productArr.length;
		if (productArrLength > 9) {
			await ctx.reply('К сожалению, можно отслеживать не более 10ти позиций.');
			return false
		}

		// const domainName = url.match(/https:\/\/(.*?)\//);
		const condition = (url.includes('bike-components')) || (url.includes('bike-discount')) || (url.includes('chainreactioncycles'));
		if (condition) {
			return true
		} else {
			const message = `Ссылка не рабочая, поддерживаются сайты:\nhttps://www.bike-components.de/en/\nhttps://www.bike-discount.de/en/\nhttps://www.chainreactioncycles.com/ru/ru\nПопробуйте еще раз! /new`;
			const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };
			await ctx.reply(message, htmlDisPrev);
			return false
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = verification;