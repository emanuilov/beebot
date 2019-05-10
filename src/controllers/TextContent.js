import lessons from '../text-content/lessons';
import ui from '../text-content/ui';

function getText() {
	const text = {};
	// const langSetting = localStorage.getItem('lang');
	// if (langSetting === 'bg' || langSetting === null) {
	text.lessons = lessons.bg;
	text.ui = ui.bg;
	// }
	return text;
}

export default getText();
