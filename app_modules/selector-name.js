// функция возвращает соответствующий селектор для определенного сайта
function getSelectorName(url) {

	if (url.includes('bike-components')) {
		return '.name-product';
	}
	if (url.includes('bike-discount')) {
		return 'body > div:nth-child(4) > div > section > div > div.content--wrapper > div.content.product--details > div.product--detail-upper.block-group > div.product--image-container.image-slider > div.product--headername > h1';
	}
	if (url.includes('chainreactioncycles')) {
		return '#crcPDP1 > div.left-column > li.crcPDPLeft > ul > li.crcPDPTitle > h1';
	}
}

module.exports = getSelectorName;