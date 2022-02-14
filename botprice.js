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
const priceChanges = require('./app_modules/price-changes');
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
const millisecondsInTwentyMinutes = 1200000;
// const millisecondsInTwentyMinutes = 120000; //!! for dev
const millisecondsInMinute = 60000;

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
	await ctx.scene.enter('super-wizard').catch((error) => console.log(error));
});

bot.command('/request', async (ctx) => {
	const userId = ctx.message.from.id;
	await ctx.reply('Отслеживаемые товары:').catch((error) => console.log(error));
	await requestProducts(bot, userId).catch((error) => console.log(error));
});

bot.command('/changes', async (ctx) => {
	const userId = ctx.message.from.id;
	await priceChanges(ctx, userId).catch((error) => console.log(error));
});

bot.command('/description', async (ctx) => {
	await ctx.reply(text.description, htmlDisPrev).catch((error) => console.log(error));
});

bot.command('/delete', async (ctx) => {
	try {
		const keyboard = await deleteProduct(ctx);
		if (keyboard[0]) {
			await ctx.reply('Выберите исключаемый велотовар из отслеживания цены:', { reply_markup: { inline_keyboard: keyboard } });
			setTimeout(async () => {
				await ctx.deleteMessage(ctx.update.message.message_id).catch((error) => console.log(error));
				await ctx.deleteMessage(ctx.update.message.message_id + 1).catch((error) => console.log(error));
			}, millisecondsInMinute);
		} else {
			await ctx.reply('Вы не отслеживаете цены на велотовары.');
		}
	} catch (error) {
		console.log(error)
	}
});

// обработка всех нажатий инлайн кнопок
bot.on('callback_query', async (ctx) => {
	const id = ctx.callbackQuery.data;
	await Product.findByIdAndDelete(id);
	await ctx.reply('Товар удален.');
	setTimeout(async () => {
		await ctx.deleteMessage(ctx.update.callback_query.message.message_id + 1).catch((error) => console.log(error));
	}, millisecondsInMinute)
})


bot.launch()
	.then(async () => {
		await bot.telegram.sendMessage(process.env.MY_TELEGRAM_ID, 'restart...');
		setInterval(async () => {
			await updatePrice(bot).catch((error) => console.log(error));
			await priceMonitoring(bot).catch((error) => console.log(error));
		}, millisecondsInTwentyMinutes);
	})
	.catch(error => console.log(error));


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));