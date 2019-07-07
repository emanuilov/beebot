const InitialLocation = () => {
	if (
		localStorage.getItem('expiration') !== null &&
		new Date(localStorage.getItem('expiration')) >= new Date() &&
		localStorage.getItem('mac') === window.MAC
	) {
		return window.goTo('/Game');
	}
	return window.goTo('/Game');
};

export default InitialLocation;
