//проверка снижения цены
const Product = require('../models/Product');

async function priceMonitoring(bot) {
	try {
		const productDbArr = await Product.find({ updated: true });
		productDbArr.forEach(async element => {
			await Product.findOneAndUpdate({ _id: element._id }, { $set: { updated: false } });
			elementPriceLength = element.prices.length;
			// выполнять вычисление изменение цены только когда в массиве цен элементов больше одного
			if (elementPriceLength > 1) {
				priceNew = element.prices[elementPriceLength - 1].price;
				priceOld = element.prices[elementPriceLength - 2].price;
				if (priceOld > priceNew) {
					const textPriceFall = `❗️❗️❗️Цена снизилась❗️❗️❗️\nНа "${element.nameRequest}" на сумму <b>${(priceOld - priceNew).toFixed(2)}${element.currency}</b>\nАктуальная цена составляет <b>${priceNew}${element.currency}!</b> \n<a href = "${element.url}" >Ссылка на товар!</a> `;

					await bot.telegram.sendMessage(element.userId, textPriceFall, { parse_mode: 'html', disable_web_page_preview: true });
				}
			}
		});
		console.log(`${new Date().toLocaleString()}- проверка изменения цен`);  //!! for dev
	} catch (error) {
		console.log(error);
	}
};

module.exports = priceMonitoring;