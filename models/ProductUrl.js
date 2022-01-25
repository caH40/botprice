//для построения графиков, !!!в разработке
const { Schema, model } = require('mongoose');

const productUrlSchema = new Schema({
	numberUrl: { type: Number, required: true },
	url: { type: String, required: true },
	dateUpdate: { type: Number },
	price: { type: Number },
	currency: { type: String, default: 'euro' }
});

module.exports = model('productUrls', productUrlSchema);