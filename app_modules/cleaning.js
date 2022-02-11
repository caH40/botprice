function cleaning(price, url) {
	try {
		if (url.includes('chainreactioncycles')) {
			price = price.match(/^([^RUB]+)/g)[0];
		}
		if (url.includes('aliexpress.ru')) {
			price = price.match(/^.{1,12},\d\d/gm)[0];
		}
		if (url.includes('citilink.ru')) {
			price = price + '00';
		}
		price = price.match(/[0-9]/g).join('');
		const priceLength = price.length;
		const euro = price.slice(0, priceLength - 2);
		const cent = price.slice(priceLength - 2);
		price = `${euro}.${cent}`;
		return Number(price);
	} catch (error) {
		console.log(error);
	}
};

module.exports = cleaning;