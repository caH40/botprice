const Product = require('../models/Product');

async function verification(url, username, ctx) {
	try {
		const found = await Product.findOne({ url: url, user: username });
		if (found) {
			await ctx.reply(`
			Вы уже отслеживаете данную позицию!\n${found.nameRequest}.\nТекущая цена ${found.price}€.`);
		}
		const domainName = url.match(/https:\/\/(.*?)\//);
		if (domainName) {
			return true
		} else {
			await ctx.reply(`Ссылка не рабочая, попробуйте еще раз!\n/new`);
			return false
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = verification;