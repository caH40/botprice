// добавляет новый товар, если уже есть позиция у пользователя (проверка по url), то обновляет в базе
const puppeteer = require('puppeteer');

const getSelectorPrice = require('./selector-price');
const getSelectorName = require('./selector-name');
const addToDb = require('./addtodb');
const { selectorBikeDisAccept, selectorBikeDisDelivery, selectorBikeDisCountry } = require('./text');

async function parse(url, bot, username, userId) {
	try {
		const selectorPrice = getSelectorPrice(url);
		const selectorName = getSelectorName(url);

		// const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: ['--no-sandbox'] }).catch((error) => console.log(error));// for Ubuntu VPS
		// const browser = await puppeteer.launch({ headless: false, slowMo: 200, devtools: true }); //!!for dev
		const browser = await puppeteer.launch().catch(error => console.log(error)); //for win

		const page = await browser.newPage().catch(error => console.log(error));
		await page.setViewport({
			width: 1024,
			height: 768,
			deviceScaleFactor: 1
		});
		await page.goto(url)
			.catch((error) => console.log(new Date().toLocaleString(), error));

		if (url.includes('bike-discount.de')) {
			await page.waitForSelector(selectorBikeDisAccept).catch(error => console.log(error));
			await page.click(selectorBikeDisAccept).catch(error => console.log(error));
			await page.click(selectorBikeDisDelivery).catch(error => console.log('click delivery', error));
			await page.waitForSelector(selectorBikeDisCountry).catch(error => console.log(error));
			await page.click(selectorBikeDisCountry).catch(error => console.log('click Russia', error));
		}

		await page.waitForSelector(selectorPrice).catch(error => console.log(error));
		const price = await page.$eval(selectorPrice, el => el.innerText).catch(error => console.log(error));
		const productName = await page.$eval(selectorName, el => el.innerText);
		await addToDb(price, productName, url, bot, username, userId).catch(error => console.log(error));
		await browser.close().catch(error => console.log(error));
	} catch (error) {
		console.log(error);
	}
}
module.exports = parse;