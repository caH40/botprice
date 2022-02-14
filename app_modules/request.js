// запрос всех отслеживаемых товаров
// принимает функция ctx и userId
const Product = require('../models/Product');
const cleanPost = require('./clean-post');

async function requestProducts(bot, userId) {
	try {
		const products = await Product.find({ userId: userId });
		var postAllStore = {
			discount: '<u>Магазин bike-discount:</u>\n',
			components: '<u>Магазин bike-components:</u>\n',
			chainReaction: '<u>Магазин ChainReaction:</u>\n',
			aliexpress: '<u>Магазин aliexpress:</u>\n',
			citilink: '<u>Магазин citilink:</u>\n'
		};

		function postMessage(product, store) {
			let productPriceLength = product.prices.length;
			let priceLast = product.prices[productPriceLength - 1].price; //цена в последнем элементе массива
			postAllStore[store] = postAllStore[store] + `<a href="${product.url}"><b>-${product.nameRequest}</b></a>- <u>${priceLast}${product.currency}</u>\n`;
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
		// const notNull = post ? post : 'Вы не отслеживаете цены на велотовары.';
		Object.keys(postAllStore).forEach(async element => {
			await bot.telegram.sendMessage(userId, postAllStore[element], { parse_mode: 'html', disable_web_page_preview: true });
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = requestProducts