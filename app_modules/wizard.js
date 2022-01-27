const WizardScene = require('telegraf/scenes/wizard');

const verification = require('./verification');
const parse = require('./parse');

const extra = { disable_web_page_preview: true };

const superWizard = new WizardScene('super-wizard',
	async ctx => {
		try {
			await ctx.reply('Введите ссылку на товар', extra);
			ctx.wizard.state.data = {};
			return await ctx.wizard.next();
		} catch (error) {
			console.log(error);
		}
	},

	async ctx => {
		try {
			const username = ctx.message.from.username;
			const userId = ctx.message.from.id;
			ctx.wizard.state.data.url = ctx.message.text;
			const checker = await verification(ctx.wizard.state.data.url, username, ctx);
			if (checker) {
				await parse(ctx.wizard.state.data.url, ctx, username, userId);
			}
			return await ctx.scene.leave();
		} catch (error) {
			console.log(error);
		}
	}
);

module.exports = superWizard;