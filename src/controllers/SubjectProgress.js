export default class SubjectProgress {
	constructor(id) {
		if (localStorage.getItem('lessonID') === null && !id) {
			// Initialization
			localStorage.setItem('lessonID', 0);
			localStorage.setItem('taskID', 0);
		} else if (!id) {
			// Next lesson (All complete)
			this.lessonID = parseInt(localStorage.getItem('lessonID'), 10);
			this.taskID = parseInt(0, 10);
		} else {
			// Redirection
			this.lessonID = parseInt(id, 10);
			this.taskID = parseInt(0, 10);
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
