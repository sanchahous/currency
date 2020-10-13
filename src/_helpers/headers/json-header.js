export const jsonHeader = (token) => {
	if(token === 'currency') {
		return {
			'Content-Type': 'application/json',
			'Authorization': `Token 64bdbccd22f84feaa73f2793625423d0`
		};
	} else {
		return {
			'Content-Type': 'application/json',
		};
	}
};
