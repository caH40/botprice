// функция возвращает соответствующий селектор для определенного сайта
function getSelectorPrice(url) {
	try {
		if (url.includes('bike-components')) {
			return '.price';
		}
		if (url.includes('bike-discount')) {
			return '#netz-price';
		}
		if (url.includes('chainreactioncycles')) {
			return '#crcPDP1 > div.right-column > li.crcPDPRight > div.price-wrapper.clearfix > div > div.price > div > div > div';
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = getSelectorPrice;