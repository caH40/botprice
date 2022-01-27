const Product = require('../models/Product');

async function deleteProduct(ctx) {
	try {
		const username = ctx.message.from.username;
		let productForDelete = [];
		const productArray = await Product.find({ user: username });
		productArray.forEach(element => {
			productForDelete.push([{ text: `${element.nameRequest}, ${element.domainName}`, callback_data: element._id }])
		});
		return productForDelete;
	} catch (error) {
		console.log(error);
	}
}

module.exports = deleteProduct;