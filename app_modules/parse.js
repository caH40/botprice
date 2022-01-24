// добавляет новый товар, если уже есть позиция у пользователя (проверка по url), то обновляет в базе
const puppeteer = require('puppeteer');

const getSelector = require('./selector');
const cleaning = require('./cleaning');

const Item = require('../models/Item');

async function parse(username, nameRequest, url, bot) {
	const selector = getSelector(url);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	if (url.includes('bike-discount.de')) {
		await page.click('#uc-btn-accept-banner').catch(error => console.log(error));
	}
	await page.waitForSelector(selector);
	let price = await page.$eval(selector, el => el.innerText);
	price = cleaning(price);
	const created = await Item.findOne({ user: username, url: url });

	if (created) {
		//проверка снижения цены
		if (created.price > price) {
			const textPriceFall = `❗️❗️❗️Цена снизилась❗️❗️❗️\n
			На "${created.nameRequest}" на сумму <b>${(created.price - price).toFixed(2)}€</b>\n
			Актуальная цена составляет <b>${price}</b> \n
			<a href = "${created.url}" >Ссылка на товар!</a> `;

			await bot.reply(textPriceFall, { parse_mode: 'html', disable_web_page_preview: true });
		}
		await Item.findOneAndUpdate(
			{ user: username, url: url },
			{ $set: { date: new Date().toLocaleString(), price: price } }
		)
	} else {
		const item = await new Item(
			{
				user: username,
				nameRequest: nameRequest,
				url: url,
				selector: selector,
				date: new Date().toLocaleString(),
				price: price
			});
		item.save();
	};
	await browser.close();
}

module.exports = parse



