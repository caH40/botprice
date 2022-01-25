// Запись и обновление позиций в базе данных
const Product = require('../models/Product');
const cleaning = require('./cleaning');

async function addToDb(price, productName, username, url, bot) {
	try {
		price = cleaning(price);
		const created = await Product.findOne({ user: username, url: url });
		if (created) {
			//проверка снижения цены
			if (created.price > price) {
				const textPriceFall = `❗️❗️❗️Цена снизилась❗️❗️❗️\nНа "${created.nameRequest}" на сумму <b>${(created.price - price).toFixed(2)}€</b>\nАктуальная цена составляет <b>${price}</b> \n<a href = "${created.url}" >Ссылка на товар!</a> `;

				await bot.reply(textPriceFall, { parse_mode: 'html', disable_web_page_preview: true });
			}
			await Product.findOneAndUpdate(
				{ user: username, url: url },
				{ $set: { date: new Date().toLocaleString(), price: price } }
			)
		} else {
			const domainName = url.match(/https:\/\/(.*?)\//)[1];
			const product = await new Product(
				{
					user: username,
					nameRequest: productName,
					url: url,
					domainName: domainName,
					date: new Date().toLocaleString(),
					price: price
				});
			await product.save()
				.then(console.log('added data to mongo...'))
				.then(bot.reply(`${productName} успешно добавлен.\nТекущая цена ${price}€`))
				.catch(error => console.error(error));
		};
	} catch (error) {
		console.log(error);
	}
};

module.exports = addToDb;