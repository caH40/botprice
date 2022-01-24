function cleaning(price) {
	try {
		price = price.split('€').join('');
		price = price.split(',').join('.');
		return price
	} catch (error) {
		console.log(error)
	}
};

module.exports = cleaning;