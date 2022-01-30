//bot здесь не используем, а передаем в parse
const Product = require('../models/Product');
const parse = require('./parse');


const millisecondsInFourSecond = 4000;

async function control(bot) {
	try {
		const created = await Product.find();
		let i = 0;
		//задержка для каждого запуска parse, что бы открывалась только одна копия браузера
		created.forEach(element => {
			i++
			setTimeout(async () => {
				const username = element.user;
				const userId = element.userId;
				await parse(element.url, bot, username, userId);
				console.log(`${new Date().toLocaleString()}- обновление в БД`);  //!! for dev
			}, millisecondsInFourSecond * i);
		})

	} catch (error) {
		console.log(error);
	}
};

module.exports = control;