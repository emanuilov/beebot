window.goTo = path => {
	window.location.href = path;
};

window.openLink = link => {
	nw.Shell.openExternal(link);
};

window.openMail = email => {
	nw.Shell.openExternal(`mailto:${email}`);
};
