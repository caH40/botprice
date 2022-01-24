// функция возвращает соответствующий селектор для определенного сайта
function getSelectorPrice(url) {

	if (url.includes('bike-components')) {
		return '.price';
	}
	if (url.includes('bike-discount')) {
		return '#netz-price';
	}
}

module.exports = getSelectorPrice;