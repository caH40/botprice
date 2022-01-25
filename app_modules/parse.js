// добавляет новый товар, если уже есть позиция у пользователя (проверка по url), то обновляет в базе
const puppeteer = require('puppeteer');

const getSelectorPrice = require('./selector-price');
const getSelectorProduct = require('./selector-product');
const addToDb = require('./addtodb');
const { selectorBikeDisAccept, selectorBikeDisDelivery, selectorBikeDisCountry } = require('./text');

async function parse(username, url, bot) {
	try {
		const selectorPrice = getSelectorPrice(url);
		const selectorProduct = getSelectorProduct(url);
		const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] }).catch((error) => console.log(error));// for Ubuntu VPS
		// const browser = await puppeteer.launch({ headless: false, slowMo: 200, devtools: true }); //for dev
		// const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto(url)
			.catch(error => {
				console.error(error);
				bot.reply('Ссылка не рабочая, попробуйте еще раз!');
			});

		if (url.includes('bike-discount.de')) {
			await page.waitForSelector(selectorBikeDisAccept);
			await page.click(selectorBikeDisAccept).catch(error => console.log(error));
			await page.click(selectorBikeDisDelivery).catch(error => console.log('click delivery', error));
			await page.waitForSelector(selectorBikeDisCountry);
			await page.click(selectorBikeDisCountry).catch(error => console.log('click Russia', error));
		}
		await page.waitForSelector(selectorPrice);
		const price = await page.$eval(selectorPrice, el => el.innerText);
		const productName = await page.$eval(selectorProduct, el => el.innerText);
		await addToDb(price, productName, username, url, bot);
		await browser.close();
	} catch (error) {
		console.log(error);
	}
}

module.exports = parse;