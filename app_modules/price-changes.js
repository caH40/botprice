const Product = require('../models/Product');
const cleanPost = require('./clean-post');

async function priceChanges(ctx, userId) {
	try {
		var pricesNotChanges = true;
		const products = await Product.find({ userId: userId });
		var postAllStore = {
			discount: '<u>Магазин bike-discount:</u>\n',
			components: '<u>Магазин bike-components:</u>\n',
			chainReaction: '<u>Магазин ChainReaction:</u>\n',
			aliexpress: '<u>Магазин aliexpress:</u>\n',
			citilink: '<u>Магазин citilink:</u>\n'
		};
		function postMessage(product, store, checkerChanges) {
			let productPriceLength = product.prices.length;
			var priceChange;
			for (let i = 1; i < productPriceLength; i++) {
				const dateNow = new Date(product.prices[i].date).toLocaleString();
				priceChange = (product.prices[i].price - product.prices[i - 1].price).toFixed(2);
				if (priceChange > 0) {
					postAllStore[store] = postAllStore[store] + `<a href="${product.url}"><b>-${product.nameRequest}</b></a>- <u>\n${dateNow}, изменение: +${priceChange}${product.currency}</u>\n`;
					pricesNotChanges = false;
				}
				if (priceChange < 0) {
					postAllStore[store] = postAllStore[store] + `<a href="${product.url}"><b>-${product.nameRequest}</b></a>- <u>\n${dateNow}, изменение: ${priceChange}${product.currency}</u>\n`;
					pricesNotChanges = false;
				} else {
					pricesNotChanges = pricesNotChanges && true;
				}

			}
		}

		for (let i = 0; i < products.length; i++) {
			if (products[i].domainName === 'www.bike-discount.de') {
				postMessage(products[i], 'discount');
			}
			if (products[i].domainName === 'www.bike-components.de') {
				postMessage(products[i], 'components');
			}
			if (products[i].domainName === 'www.chainreactioncycles.com') {
				postMessage(products[i], 'chainReaction');
			}
			if (products[i].domainName === 'aliexpress.ru') {
				postMessage(products[i], 'aliexpress');
			}
			if (products[i].domainName === 'www.citilink.ru') {
				postMessage(products[i], 'citilink');
			}
		}
		postAllStore = cleanPost(postAllStore);
		Object.keys(postAllStore).forEach(async element => {
			await ctx.reply(postAllStore[element], { parse_mode: 'html', disable_web_page_preview: true });
		})
		if (pricesNotChanges) {
			await ctx.reply('Не было изменения цен!');
		}
		if (!products[0]) {
			await ctx.reply('Вы не отслеживаете цены на велотовары.');
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = priceChanges;


