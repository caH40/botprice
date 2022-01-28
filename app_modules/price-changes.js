const Product = require('../models/Product');

async function priceChanges(ctx, username) {
	try {
		const productArr = await Product.find({ user: username });
		productArr.forEach(async product => {
			let post = '';
			for (let index = 0; index < product.prices.length - 1; index++) {
				if (index + 1 < product.prices.length) {
					compared = product.prices[index].price - product.prices[index + 1].price;
				}
				const date = new Date(product.prices[index + 1].date).toLocaleString();
				if (compared !== 0) {
					post = post + `${date}, ${compared}`;
				}
			}
			await ctx.reply(post ? post : `Не было изменений цены:\n<u>${product.nameRequest}</u>`, { parse_mode: 'html' });
		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = priceChanges;


