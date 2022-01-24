const Product = require('../models/Product');

async function deleteProduct(ctx) {
	const username = ctx.message.from.username;

	let productForDelete = [];
	const productArray = await Product.find({ user: username });

	productArray.forEach(element => {

		productForDelete.push([{ text: `${element.nameRequest}, ${element.domainName}`, callback_data: element._id }])
	});
	return productForDelete;
}

module.exports = deleteProduct;