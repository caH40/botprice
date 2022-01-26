require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const mongoose = require('mongoose');
const Stage = require('telegraf/stage');

const Product = require('./models/Product');
const text = require('./app_modules/text');
const superWizard = require('./app_modules/wizard');
const updatePrice = require('./app_modules/update-price');
const requestProducts = require('./app_modules/request');
const deleteProduct = require('./app_modules/delete-product');
const priceMonitoring = require('./app_modules/price-monitoring');

const bot = new Telegraf(process.env.BOT_TOKEN);

// подключение к базе данных
mongoose.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..');
	})
	.catch((error) => {
		console.log(error);
	});

const stage = new Stage([superWizard]);
bot.use(session());
bot.use(stage.middleware());

bot.catch((error, ctx) => {
	console.log(`Oops, encountered an error for ${ctx.updateType}`, error);
});

const htmlDisPrev = { parse_mode: 'html', disable_web_page_preview: true };

bot.start(async (ctx) => {
	const userName = ctx.update.message.from.username;
	await ctx.reply(`Привет ${userName ? userName : 'незнакомец'} ! ${text.start}`, htmlDisPrev)
		.catch((error) => console.log(error));
});

bot.help(async (ctx) => {
	await ctx.reply(text.commands, htmlDisPrev).catch((error) => console.log(error));
});

// сцены
bot.command('/new', async (ctx) => {
	await ctx.scene.enter('super-wizard');
});

bot.command('/request', async (ctx) => {
	const username = ctx.update.message.from.username;
	await ctx.reply('Отслеживаемые товары:');
	await requestProducts(ctx, username);
});

// '/update'на время разработки
bot.command('/update', async (ctx) => {
	await ctx.reply('Обновление цен в базе данных в разработке....');
	await updatePrice(ctx);
});

bot.command('/delete', async (ctx) => {
	const keyboard = await deleteProduct(ctx);
	if (keyboard[0]) {
		await ctx.reply('Выберите исключаемый велотовар из отслеживания цены:', { reply_markup: { inline_keyboard: keyboard } });
	} else {
		await ctx.reply('Вы не отслеживаете цены на велотовары.');
	}
});

// обработка всех нажатий инлайн кнопок
bot.on('callback_query', async (ctx) => {
	const id = ctx.callbackQuery.data;
	await Product.findByIdAndDelete(id)
		.then(ctx.reply('Товар удален.'));
})
const millisecondsInHour = 3600000;
bot.launch()
	.then(async () => {
		await bot.telegram.sendMessage(412801722, 'restart...');
		setInterval(() => {
			priceMonitoring(bot)
		}, millisecondsInHour);
	})
	.catch(error => console.log(error));

setInterval(() => {
	updatePrice()
}, millisecondsInHour);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));