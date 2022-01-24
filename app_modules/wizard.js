const WizardScene = require('telegraf/scenes/wizard');

const parse = require('./parse');

const extra = { disable_web_page_preview: true };
const superWizard = new WizardScene('super-wizard',
	// ctx => {
	// 	ctx.reply('Введите наименование отслеживаемого товара (свободная форма)');
	// 	ctx.wizard.state.data = {};
	// 	return ctx.wizard.next();
	// },
	ctx => {
		// ctx.wizard.state.data.nameProduct = ctx.message.text;
		ctx.reply('Введите ссылку на товар', extra);
		ctx.wizard.state.data = {};
		return ctx.wizard.next();
	},
	ctx => {
		const username = ctx.message.from.username;
		ctx.wizard.state.data.url = ctx.message.text;
		parse(username, ctx.wizard.state.data.url, ctx);
		return ctx.scene.leave();
	}
);

module.exports = superWizard;