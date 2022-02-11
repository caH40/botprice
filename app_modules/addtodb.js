// Запись и обновление позиций в базе данных
const Product = require('../models/Product');
const cleaning = require('./cleaning');

async function addToDb(price, productName, url, bot, username, userId) {
	try {
		price = cleaning(price, url).toLocaleString();
		let currency = '';
		if (url.includes('chainreactioncycles') || url.includes('aliexpress.ru') || url.includes('citilink.ru')) {
			currency = 'RUB';
		} else {
			currency = '€';
		}
		const date = new Date().getTime();
		const dateString = new Date().toLocaleString();
		//!! два раза один и тот же запрос в БД
		let productDb = await Product.findOne({ user: username, url: url });
		if (productDb) {
			const productDbArr = await Product.findOne({ user: username, url: url })
			let priceObj = productDbArr.prices;
			priceObj.push({ date, price });
			await Product.findOneAndUpdate({ user: username, url: url }, { $set: { lastUpdate: dateString, prices: priceObj, updated: true } })
		} else {
			const domainName = url.match(/https:\/\/(.*?)\//)[1];
			const product = await new Product(
				{
					user: username,
					userId: userId,
					nameRequest: productName,
					url: url,
					domainName: domainName,
					lastUpdate: dateString,
					prices: { date, price },
					currency: currency,
					updated: false
				});
			await product.save()
				.then(console.log('added data to mongo...', username, productName))
				.then(bot.telegram.sendMessage(userId, (`${productName} успешно добавлен.\nТекущая цена ${price}${currency}`)))
				.catch(error => console.error(error))
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = addToDb;