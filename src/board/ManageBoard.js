import $ from 'jquery';

export default class ManageBoard {
	constructor() {
		this.beePosition = null;
		this.beeSteps = [];
		this.beeRotation = 0;
		this.intervals = {
			betweenActions: 500,
			pause: 1
		};
	}

	getBoxCoordinates(imagePosition) {
		const defaultValues = {
			startBox: 15,
			nextBox: 134
		};
		return {
			x: defaultValues.startBox + defaultValues.nextBox * (imagePosition.boxID - 1),
			y: defaultValues.startBox + defaultValues.nextBox * (imagePosition.rowID - 1)
		};
	}

	insertImage(imageName, imagePosition, rotation = 0) {
		const imageCoordinates = this.getBoxCoordinates(imagePosition);

		const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		image.setAttribute('href', `/img/screen2/lessons/in-lesson-pictures/${imageName}.png`);
		image.setAttribute('x', imageCoordinates.x);
		image.setAttribute('y', imageCoordinates.y);
		if (imageName === 'bee') {
			image.setAttribute(
				'transform',
				`rotate(${rotation}, ${62.5 + imageCoordinates.x}, ${62.5 + imageCoordinates.y})`
			);
			$('embed')[0]
				.getSVGDocument()
				.getElementById('beeContainer')
				.appendChild(image);
			this.beePosition = imagePosition;
		} else {
			$('embed')[0]
				.getSVGDocument()
				.getElementById('lessonImages')
				.appendChild(image);
		}
	}

	getBoxAndRowID(mouseCoordinates) {
		const coordinates = {
			rowID: null,
			boxID: null
		};

		if (mouseCoordinates.x <= 143) {
			coordinates.boxID = 1;
		} else if (mouseCoordinates.x <= 278) {
			coordinates.boxID = 2;
		} else if (mouseCoordinates.x <= 411) {
			coordinates.boxID = 3;
		} else if (mouseCoordinates.x <= 544) {
			coordinates.boxID = 4;
		} else {
			coordinates.boxID = 5;
		}

		if (mouseCoordinates.y <= 143) {
			coordinates.rowID = 1;
		} else if (mouseCoordinates.y <= 278) {
			coordinates.rowID = 2;
		} else if (mouseCoordinates.y <= 411) {
			coordinates.rowID = 3;
		} else if (mouseCoordinates.y <= 544) {
			coordinates.rowID = 4;
		} else {
			coordinates.rowID = 5;
		}

		return coordinates;
	}

	checkIfTheMovementIsPossible(position) {
		if (position.boxID > 0 && position.boxID < 6 && position.rowID > 0 && position.rowID < 6) {
			return true;
		}
		return false;
	}

	getBeeOrientation() {
		switch (this.beeRotation) {
			case 0:
				return 1;
			case 90:
				return 2;
			case 180:
				return 3;
			case 270:
				return 4;
			default:
				return 1;
		}
	}

	getTheWantedPosition(direction, beeOrientation) {
		let movement = null;
		const positionCopy = this.beePosition;
		if (direction === 1) {
			movement = 1;
		} else {
			movement = -1;
		}
		switch (beeOrientation) {
			case 1:
				positionCopy.rowID += movement;
				return positionCopy;
			case 2:
				positionCopy.boxID += movement;
				return positionCopy;
			case 3:
				positionCopy.rowID += movement;
				return positionCopy;
			case 4:
				positionCopy.boxID += movement;
				return positionCopy;
			default:
				return positionCopy;
		}
	}

	moveTheBee(rotation, inputPosition, direction = null) {
		let newPosition = inputPosition;
		if (inputPosition == null) {
			newPosition = this.getTheWantedPosition(direction, this.getBeeOrientation());
		}
		if (this.checkIfTheMovementIsPossible(newPosition)) {
			setTimeout(() => {
				const beeContainer = $($('embed')[0].getSVGDocument()).find('#beeContainer');
				beeContainer.empty();
				this.insertImage('bee', newPosition, rotation);
			}, this.intervals.betweenActions);
			return true;
		}
		return false;
	}

	getMouseCoordinates(canvas, event) {
		const rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	runTheSteps() {
		this.beeSteps.forEach(beeStep => {
			switch (beeStep) {
				case 1:
					if (!this.moveTheBee(this.beeRotation, null, 1)) {
						this.makeTheBeeEyesRed();
					}
					break;
				case 2:
					this.beeRotation = (90 + this.beeRotation) % 360;
					this.moveTheBee(this.beeRotation, this.beePosition);
					break;
				case 3:
					setTimeout(() => {}, this.intervals.pause);
					break;
				case 4:
					if (!this.moveTheBee(this.beeRotation, null, 2)) {
						this.makeTheBeeEyesRed();
					}
					break;
				case 5:
					this.beeRotation = (-90 + this.beeRotation) % 360;
					this.moveTheBee(this.beeRotation, this.beePosition);
					break;
				default:
					break;
			}
		});
	}

	resetTheBoard() {
		this.beeSteps = [];
		$($('embed')[0].getSVGDocument())
			.find('#beeContainer')
			.empty();
		const beeContainer = $('.bee-container');
		beeContainer.empty();
		beeContainer.append("<img src='./img/screen2/lessons/in-lesson-pictures/bee.png' alt='Bee'>");
	}

	pushSteps(actionID) {
		this.beeSteps.push(actionID);
	}

	makeTheBeeEyesRed() {}
}
