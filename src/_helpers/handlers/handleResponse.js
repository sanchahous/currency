export const handleResponse = ( response, responseLikeText = false ) => {
	const responseVariation = responseLikeText ? response.text() : response.json();
	return responseVariation.then( data => {
		if (!response.ok) {
			const errorData = data;
			if (response.status === 422) {
				return Promise.reject( errorData );
			} else if (response.status === 403) {
				return Promise.reject( errorData );
			} else {
				return Promise.reject( errorData );
			}
		}
		return data;
	} );
};
