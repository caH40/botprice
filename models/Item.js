const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
	user: { type: String }, //nameid в телеграм
	nameRequest: { type: String }, //имя присваемое запросу товара
	url: { type: String }, // урл товара
	selector: { type: String }, //селектор цены товара
	date: { type: String },
	price: { type: Number } // цена товара
});

module.exports = model('items', itemSchema);