const start = `
При нажатии "/" вызываются команды бота!
Или воспользуйтесь /help
`
const commands =
	`
/help - помощь
/new - добавление товара
/request - опрос всех позиций
/changes - опрос изменений цен
/description - описание сервиса
/delete - удаление товара
`;

const selectorBikeDisAccept = '.uc-btn-accept';
const selectorBikeDisDelivery = 'body > div:nth-child(4) > div > header > div.top-bar > div > nav > div.navigation--entry.entry--service.has--drop-down.delivery';
const selectorBikeDisCountry = 'body > div:nth-child(4) > div > header > div.top-bar > div > nav > div.navigation--entry.entry--service.has--drop-down.delivery.js--is--dropdown-active > ul > li.service--entry.flag-icon-ru.entry130.service--link';

const description = 'Для мониторинга цены на велотовар необходимо скопировать полный URL-адрес на товар, выбрать команду /new у бота, вставить URL-адрес, нажать ввод.\nДля https://www.chainreactioncycles.com/ru/ru первоначально необходимо выбрать страну Россия. Для товара где указан диапазон цен (297.07 RUB - 437.75 RUB) будет отслеживаться минимальная цена, выбор конкретной модификации товара не предусмотрен.\nДля bike-discount.de/en и bike-components.de/en/ нет необходимости выбирать страну Россия перед копированием URL-адреса на товар.';
const messageBadUrl = `Ссылка не рабочая, поддерживаются сайты:\nhttps://www.bike-components.de/en/\nhttps://www.bike-discount.de/en/\nhttps://www.chainreactioncycles.com/ru/ru\nПопробуйте еще раз! /new`;
const messageNeedUsername = 'Что бы воспользоваться сервисом необходимо заполнить "username" в настройках своего профиля телеграм.';

module.exports.start = start
module.exports.commands = commands
module.exports.selectorBikeDisAccept = selectorBikeDisAccept
module.exports.selectorBikeDisDelivery = selectorBikeDisDelivery
module.exports.selectorBikeDisCountry = selectorBikeDisCountry
module.exports.description = description
module.exports.messageBadUrl = messageBadUrl
module.exports.messageNeedUsername = messageNeedUsername
