const Product = require('../models/Product');

async function priceChanges(ctx, username) {
	try {
		const productArr = await Product.find({ user: username });
		let countNull = 0;
		productArr.forEach(product => {
			const firstPost = `${product.nameRequest}\n<a href="${product.url}">${product.domainName}\n</a>`;
			let post = firstPost

			for (let index = 0; index < product.prices.length - 1; index++) {
				if (index + 1 < product.prices.length) {
					compared = (product.prices[index + 1].price - product.prices[index].price);
				}
				const date = new Date(product.prices[index + 1].date).toLocaleString();
				if (compared !== 0) {
					;
					post = post + `${date}, изменение: ${compared < 0 ? compared.toFixed(2) : "+" + compared.toFixed(2)}\n`;
				} else {

					countNull++
				}
			}
			if (productArr.length === countNull) {
				ctx.reply(`Не было изменений цен.`).catch(error => console.log(error));
			}
			if (post !== firstPost) {
				ctx.reply(post, { parse_mode: 'html', disable_web_page_preview: true }).catch(error => console.log(error));
			}


		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = priceChanges;


