function cleanPost(postAllStore) {
	const postKeys = Object.keys(postAllStore);
	const postKeysLengthArr = postKeys.length;
	let postValue = [];
	postKeys.forEach(element => {
		postValue.push(postAllStore[element]);
	})
	postAllStore = {};

	for (let i = 0; i < postKeysLengthArr; i++) {
		if (postKeys[i] === 'discount') {
			if (postValue[i] !== '<u>Магазин bike-discount:</u>\n') {
				postAllStore.discount = postValue[i];
			}
		}
		if (postKeys[i] === 'components') {
			if (postValue[i] !== '<u>Магазин bike-components:</u>\n') {
				postAllStore.components = postValue[i];
			}
		}
		if (postKeys[i] === 'chainReaction') {
			if (postValue[i] !== '<u>Магазин ChainReaction:</u>\n') {
				postAllStore.chainReaction = postValue[i];
			}
		}
		if (postKeys[i] === 'aliexpress') {
			if (postValue[i] !== '<u>Магазин aliexpress:</u>\n') {
				postAllStore.aliexpress = postValue[i];
			}
		}
		if (postKeys[i] === 'citilink') {
			if (postValue[i] !== '<u>Магазин citilink:</u>\n') {
				postAllStore.citilink = postValue[i];
			}
		}
	}
	return postAllStore;
}

module.exports = cleanPost;