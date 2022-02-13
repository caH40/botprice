// запрос всех отслеживаемых товаров
// принимает функция ctx и userId
const Product = require('../models/Product');

async function requestProducts(bot, userId) {
	try {
		const created = await Product.find({ userId: userId });
		var postAllStore = {
			discount: '<u>Магазин bike-discount:</u>\n',
			components: '<u>Магазин bike-components:</u>\n',
			chainReaction: '<u>Магазин ChainReaction:</u>\n',
			aliexpress: '<u>Магазин aliexpress:</u>\n',
			citilink: '<u>Магазин citilink:</u>\n'
		};

		function postMessage(element, store) {
			let elementPriceLength = element.prices.length;
			let priceLast = element.prices[elementPriceLength - 1].price; //цена в последнем элементе массива
			postAllStore[store] = postAllStore[store] + `<a href="${element.url}"><b>-${element.nameRequest}</b></a>- <u>${priceLast}${element.currency}</u>\n`;
		}

		function cleanPost(postAllStore) {
			console.log('Запуск функции cleanPost')
			const postKeys = Object.keys(postAllStore);
			const postKeysLengthArr = postKeys.length;
			let postValue = [];
			postKeys.forEach(element => {
				postValue.push(postAllStore[element]);
			})
			postAllStore = {};

			for (let i = 0; i < postKeysLengthArr; i++) {
				if (postKeys[i] === 'discount') {
					if (postValue[i] !== '<u>Магазин bike-discount:</u>\n') {
						postAllStore.discount = postValue[i];
					}
				}
				if (postKeys[i] === 'components') {
					if (postValue[i] !== '<u>Магазин bike-components:</u>\n') {
						postAllStore.components = postValue[i];
					}
				}
				if (postKeys[i] === 'chainReaction') {
					if (postValue[i] !== '<u>Магазин ChainReaction:</u>\n') {
						postAllStore.chainReaction = postValue[i];
					}
				}
				if (postKeys[i] === 'aliexpress') {
					if (postValue[i] !== '<u>Магазин aliexpress:</u>\n') {
						postAllStore.aliexpress = postValue[i];
					}
				}
				if (postKeys[i] === 'citilink') {
					if (postValue[i] !== '<u>Магазин citilink:</u>\n') {
						postAllStore.citilink = postValue[i];
					}
				}
			}
			return postAllStore;
		}

		for (let i = 0; i < created.length; i++) {
			// switch (element.domainName) {
			if (created[i].domainName === 'www.bike-discount.de') {
				postMessage(created[i], 'discount');
			}
			if (created[i].domainName === 'www.bike-components.de') {
				postMessage(created[i], 'components');
			}
			if (created[i].domainName === 'www.chainreactioncycles.com') {
				postMessage(created[i], 'chainReaction');
			}
			if (created[i].domainName === 'aliexpress.ru') {
				postMessage(created[i], 'aliexpress');
			}
			if (created[i].domainName === 'www.citilink.ru') {
				postMessage(created[i], 'citilink');
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