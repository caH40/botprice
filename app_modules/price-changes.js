const Product = require('../models/Product');

async function priceChanges(ctx, username) {
	try {
		const productArr = await Product.find({ user: username });
		productArr.forEach(product => {
			let post = `${product.nameRequest}\n`;
			for (let index = 0; index < product.prices.length - 1; index++) {
				if (index + 1 < product.prices.length) {
					compared = (product.prices[index].price - product.prices[index + 1].price);
				}
				const date = new Date(product.prices[index + 1].date).toLocaleString();
				if (compared !== 0) {
					;
					post = post + `${date}, ${compared < 0 ? compared.toFixed(2) : "+" + compared.toFixed(2)}\n`;
				}
			}
			ctx.reply(post !== `${product.nameRequest}\n` ? post : `${product.nameRequest}\nНе было изменений цены.`)
				.catch(error => console.log(error));
		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = priceChanges;


