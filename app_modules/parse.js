// добавляет новый товар, если уже есть позиция у пользователя (проверка по url), то обновляет в базе
const puppeteer = require('puppeteer');

const getSelectorPrice = require('./selector-price');
const getSelectorProduct = require('./selector-product');
const cleaning = require('./cleaning');
const Product = require('../models/Product');

async function parse(username, url, bot) {
	const selectorPrice = getSelectorPrice(url);
	const selectorProduct = getSelectorProduct(url);
	// const selectorProduct = '.name-product'; //для bike-comp

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	if (url.includes('bike-discount.de')) {
		await page.click('#uc-btn-accept-banner').catch(error => console.log(error));
	}
	await page.waitForSelector(selectorPrice);
	let price = await page.$eval(selectorPrice, el => el.innerText);
	const productName = await page.$eval(selectorProduct, el => el.innerText);


	price = cleaning(price);
	const created = await Product.findOne({ user: username, url: url });

	if (created) {
		//проверка снижения цены
		if (created.price > price) {
			const textPriceFall = `❗️❗️❗️Цена снизилась❗️❗️❗️\n
			На "${created.nameRequest}" на сумму <b>${(created.price - price).toFixed(2)}€</b>\n
			Актуальная цена составляет <b>${price}</b> \n
			<a href = "${created.url}" >Ссылка на товар!</a> `;

			await bot.reply(textPriceFall, { parse_mode: 'html', disable_web_page_preview: true });
		}
		await Product.findOneAndUpdate(
			{ user: username, url: url },
			{ $set: { date: new Date().toLocaleString(), price: price } }
		)
	} else {
		const product = await new Product(
			{
				user: username,
				nameRequest: productName,
				url: url,
				domainName: url.match(/https:\/\/(.*?)\//)[1],
				date: new Date().toLocaleString(),
				price: price
			});
		product.save().then(console.log('added data to mongo...'));
	};
	await browser.close();
}

module.exports = parse