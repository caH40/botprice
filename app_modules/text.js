const start = `
При нажатии "/" вызываются команды бота!
Или воспользуйтесь /help
`
const commands =
	`
/help - помощь
/new - добавление товара
/request - опрос всех позиций
/delete - удаление товара
`;

const selectorBikeDisAccept = '.uc-btn-accept';
const selectorBikeDisDelivery = 'body > div:nth-child(4) > div > header > div.top-bar > div > nav > div.navigation--entry.entry--service.has--drop-down.delivery';
const selectorBikeDisCountry = 'body > div:nth-child(4) > div > header > div.top-bar > div > nav > div.navigation--entry.entry--service.has--drop-down.delivery.js--is--dropdown-active > ul > li.service--entry.flag-icon-ru.entry130.service--link';

const description = '';

module.exports.start = start
module.exports.commands = commands
module.exports.selectorBikeDisAccept = selectorBikeDisAccept
module.exports.selectorBikeDisDelivery = selectorBikeDisDelivery
module.exports.selectorBikeDisCountry = selectorBikeDisCountry
module.exports.description = description
