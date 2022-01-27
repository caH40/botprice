const Product = require('../models/Product');

async function verification(url, username, ctx) {
	try {
		const found = await Product.findOne({ url: url, user: username });
		if (found) {
			const priceLength = found.prices.length;
			if (priceLength !== 1) {
				await ctx.reply(`
				Вы уже отслеживаете данную позицию!\n${found.nameRequest}.\nТекущая цена ${found.prices[priceLength - 1].price}${found.currency}.`);
			} else {
				await ctx.reply('Вы недавно добавили велотовар, цена не обновлялась!')
			}
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