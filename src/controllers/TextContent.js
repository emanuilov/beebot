import lessons from '../text-content/lessons';
import ui from '../text-content/ui';

function getText() {
	const text = {};
	const langSetting = localStorage.getItem('lang');
	if (langSetting !== 'en') {
		text.lessons = lessons.bg;
		text.ui = ui.bg;
	} else {
		text.lessons = lessons.en;
		text.ui = ui.en;
	}
	return text;
}

export default getText();
