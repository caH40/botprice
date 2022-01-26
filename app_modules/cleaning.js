function cleaning(price) {
	try {
		price = price.match(/[0-9]/g).join('');
		const priceLength = price.length;
		const euro = price.slice(0, priceLength - 2);
		const cent = price.slice(priceLength - 2);
		price = `${euro}.${cent}`;
		return Number(price);
	} catch (error) {
		console.log(error)
	}
};

module.exports = cleaning;