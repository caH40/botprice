const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	user: { type: String }, //nameid в телеграм
	userId: { type: Number },
	nameRequest: { type: String }, //имя присваемое запросу товара
	url: { type: String }, // урл товара
	domainName: { type: String },
	lastUpdate: { type: String },
	prices: { type: Array }, // цена товара
	currency: { type: String }
});

module.exports = model('products', productSchema);