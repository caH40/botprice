require('dotenv').config();
const { Telegraf, session } = require('telegraf');
const mongoose = require('mongoose');
const Stage = require('telegraf/stage');

const text = require('./app_modules/text');
const superWizard = require('./app_modules/wizard');
const updatePrice = require('./app_modules/update-price');
const requestItems = require('./app_modules/request');

const bot = new Telegraf(process.env.BOT_TOKEN);

// подключение к базе данных
mongoose.connect(process.env.MONGODB)
	.then(() => {
		console.log('MongoDb connected..')
	})
	.catch((error) => {
		console.log(error)
	})

const stage = new Stage([superWizard]);
bot.use(session());
bot.use(stage.middleware());

bot.catch((error, ctx) => {
	console.log(`Oops, encountered an error for ${ctx.updateType}`, error)
})

bot.start(async (ctx) => {
	const userName = ctx.update.message.from.username;
	await ctx.reply(`Привет ${userName ? userName : 'незнакомец'} ! ${text.start}`, { parse_mode: 'html', disable_web_page_preview: true })
		.catch((error) => console.log(error))
});

bot.help(async (ctx) => {
	await ctx.reply(text.commands, { parse_mode: 'html', disable_web_page_preview: true }).catch((error) => console.log(error))

});

// сцены
bot.command('/new', (ctx) => {
	ctx.scene.enter('super-wizard');
});

bot.command('/request', async (ctx) => {
	const username = ctx.update.message.from.username;
	await ctx.reply('Отслеживаемые товары:')
	await requestItems(ctx, username);
});
bot.command('/update', async (ctx) => {
	await ctx.reply('Обновление цен в базе данных в разработке....')
	// await updatePrice(ctx);
});

// обработка всех нажатий инлайн кнопок
bot.on('callback_query', async (ctx) => {
})


const millisecondsInHour = 3600000
setInterval(() => {
	updatePrice(ctx)
}, millisecondsInHour);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));