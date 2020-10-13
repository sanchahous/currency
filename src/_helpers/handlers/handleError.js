export const handleError = ( errorData ) => {
	const isObject = (typeof errorData === 'object' && errorData !== undefined);
	
	if (isObject) {
		if (errorData.hasOwnProperty( 'stack-trace' ) || (errorData.status === 403)) {
			return `${ errorData.name } : ${ errorData.message } `;
		} else {
			return (Object.keys( errorData ).length) && errorData.reduce(
				( obj, item ) => Object.assign( obj, { [item.field]: item.message } ), {}
			);
		}
	} else {
		return '';
	}
};
