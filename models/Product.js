const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	user: { type: String }, //nameid в телеграм
	nameRequest: { type: String }, //имя присваемое запросу товара
	url: { type: String }, // урл товара
	domainName: { type: String },
	date: { type: String },
	price: { type: Number } // цена товара
});

module.exports = model('products', productSchema);