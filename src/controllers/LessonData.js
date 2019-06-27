export default class Lesson {
	constructor(id) {
		if (localStorage.getItem('lessonID') === null && !id) {
			localStorage.setItem('lessonID', 0);
			localStorage.setItem('taskID', 0);
		} else if (!id) {
			this.lessonID = parseInt(localStorage.getItem('lessonID'), 10);
			this.taskID = parseInt(localStorage.getItem('taskID'), 10);
		} else {
			this.lessonID = parseInt(id, 10);
			this.taskID = parseInt(id, 10);
		}
		this.trophies = this.trophies();
	}

	trophies() {
		const trophies = [
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false
		];
		trophies.fill(true, 0, parseInt(this.lessonID, 10));
		return trophies;
	}
}
