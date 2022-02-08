const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	user: { type: String, required: true }, //nameid в телеграм
	userId: { type: Number, required: true },
	nameRequest: { type: String }, //имя присваемое запросу товара
	url: { type: String, required: true }, // урл товара
	domainName: { type: String },
	lastUpdate: { type: String },
	prices: { type: Array }, // цена товара
	currency: { type: String },
	updated: { type: Boolean }
});

module.exports = model('products', productSchema);