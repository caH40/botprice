// запрос всех отслеживаемых товаров
// принимает функция ctx и username

const Item = require('../models/Item');

async function requestItems(bot, username) {
	const created = await Item.find({ user: username });
	created.forEach(async element => {
		await bot.reply(`${element.nameRequest} - ${element.price}€\nсайт ${element.url}`, { disable_web_page_preview: true });
	});
}

module.exports = requestItems