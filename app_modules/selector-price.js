// функция возвращает соответствующий селектор для определенного сайта
function getSelectorPrice(url) {
	try {
		if (url.includes('bike-components')) {
			return '.price';
		}
		if (url.includes('bike-discount')) {
			return '#netz-price';
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = getSelectorPrice;