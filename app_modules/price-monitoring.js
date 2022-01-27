//проверка снижения цены
const Product = require('../models/Product');

async function priceMonitoring(bot) {
	try {
		const productDbArr = await Product.find();
		productDbArr.forEach(async element => {
			elementPriceLength = element.prices.length;
			if (elementPriceLength !== 1) {
				priceNew = element.prices[elementPriceLength - 1].price;
				priceOld = element.prices[elementPriceLength - 2].price;
				if (priceOld > priceNew) {
					const textPriceFall = `❗️❗️❗️Цена снизилась❗️❗️❗️\nНа "${element.nameRequest}" на сумму <b>${(priceOld - priceNew).toFixed(2)}€</b>\nАктуальная цена составляет <b>${priceNew}€!</b> \n<a href = "${element.url}" >Ссылка на товар!</a> `;

					await bot.telegram.sendMessage(element.userId, textPriceFall, { parse_mode: 'html', disable_web_page_preview: true });
				}
			}
		});
		// console.log(`${new Date().toLocaleString()}- обновление в БД`);  //!! for dev
	} catch (error) {
		console.log(error);
	}
};

module.exports = priceMonitoring;