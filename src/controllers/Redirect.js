// eslint-disable-next-line import/no-unresolved
import gui from 'nw.gui';

export default function goTo(path) {
	window.location.href = path;
}

export function openLink(link) {
	gui.Shell.openExternal(link);
}

export function openMail(email) {
	gui.Shell.openExternal(`mailto:${email}`);
}
