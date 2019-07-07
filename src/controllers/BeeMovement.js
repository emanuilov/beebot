export default class BeeMovement {
	constructor(embed, beeImageName) {
		this.beePosition = null;
		this.beeSteps = [];
		this.beeRotation = 0;
		this.intervals = {
			betweenActions: 500,
			pause: 1000,
			redEyes: 1000
		};
		this.embed = embed;
		this.svg = embed.getSVGDocument();
		this.beeImageName = beeImageName;
		this.eyesBlinkedCounter = 0;
	}

	getMouseCoordinates(event) {
		const rect = this.embed.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	getBoxCoordinates(imagePosition) {
		const defaultValues = {
			padding: 15,
			grid: 4.5,
			box: 130
		};
		return {
			x:
				defaultValues.padding +
				defaultValues.box * (imagePosition.boxID - 1) +
				defaultValues.grid * (imagePosition.boxID - 1),
			y:
				defaultValues.padding +
				defaultValues.box * (imagePosition.rowID - 1) +
				defaultValues.grid * (imagePosition.rowID - 1)
		};
	}

	insertImage(position, imageName = null) {
		const imageCoordinates = this.getBoxCoordinates(position);

		const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		image.setAttribute('x', imageCoordinates.x);
		image.setAttribute('y', imageCoordinates.y);
		image.setAttribute('width', 125);
		image.setAttribute('height', 125);
		if (imageName) {
			image.setAttribute('href', `/img/lesson-pictures/${imageName}.png`);
			this.svg.getElementById('lessonImages').appendChild(image);
		} else {
			image.setAttribute('href', `/img/bees/regular/${this.beeImageName}`);
			this.svg.getElementById('beeContainer').appendChild(image);
			this.beePosition = position;
		}
	}

	getBoxAndRowID(mouseCoordinates) {
		const coordinates = {
			rowID: null,
			boxID: null
		};
		if (mouseCoordinates.x >= 15) {
			if (mouseCoordinates.x <= 133) {
				coordinates.boxID = 1;
			} else if (mouseCoordinates.x <= 257) {
				coordinates.boxID = 2;
			} else if (mouseCoordinates.x <= 381) {
				coordinates.boxID = 3;
			} else if (mouseCoordinates.x <= 505) {
				coordinates.boxID = 4;
			} else if (mouseCoordinates.x <= 629) {
				coordinates.boxID = 5;
			} else {
				coordinates.boxID = 6;
			}
		} else {
			coordinates.boxID = 0;
		}
		if (mouseCoordinates.y >= 15) {
			if (mouseCoordinates.y <= 133) {
				coordinates.rowID = 1;
			} else if (mouseCoordinates.y <= 257) {
				coordinates.rowID = 2;
			} else if (mouseCoordinates.y <= 381) {
				coordinates.rowID = 3;
			} else if (mouseCoordinates.y <= 505) {
				coordinates.rowID = 4;
			} else if (mouseCoordinates.y <= 629) {
				coordinates.rowID = 5;
			} else {
				coordinates.rowID = 6;
			}
		} else {
			coordinates.rowID = 0;
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

	getNewPosition(direction, beeOrientation) {
		const positionCopy = this.beePosition;
		switch (beeOrientation) {
			case 1: // Up
				if (direction === 1) {
					positionCopy.rowID -= 1;
				} else {
					positionCopy.rowID += 1;
				}
				return positionCopy;
			case 2: // Right
				if (direction === 1) {
					positionCopy.boxID += 1;
				} else {
					positionCopy.boxID -= 1;
				}
				return positionCopy;
			case 3: // Down
				if (direction === 1) {
					positionCopy.rowID += 1;
				} else {
					positionCopy.rowID -= 1;
				}
				return positionCopy;
			case 4: // Right
				if (direction === 1) {
					positionCopy.boxID -= 1;
				} else {
					positionCopy.boxID += 1;
				}
				return positionCopy;
			default:
				return positionCopy;
		}
	}

	moveTheBee(rotation, inputPosition, direction = null) {
		let newPosition = inputPosition;
		// Not rotating
		if (inputPosition == null) {
			newPosition = this.getNewPosition(direction, this.getBeeOrientation());
		}
		if (this.checkIfTheMovementIsPossible(newPosition)) {
			setTimeout(() => {
				const bee = this.svg.querySelector('#beeContainer image');
				const imageCoordinates = this.getBoxCoordinates(newPosition);
				bee.setAttribute('x', imageCoordinates.x);
				bee.setAttribute('y', imageCoordinates.y);
				bee.setAttribute(
					'transform',
					`rotate(${rotation}, ${62.5 + imageCoordinates.x}, ${62.5 + imageCoordinates.y})`
				);
			}, this.intervals.betweenActions);
			return true;
		}
		return false;
	}

	runTheSteps() {
		this.beeSteps.forEach(beeStep => {
			switch (beeStep) {
				case 1: // Go up
					if (!this.moveTheBee(this.beeRotation, null, 1)) {
						this.makeTheBeeEyesBlinkRed();
					}
					break;
				case 2: // Rotate right
					this.beeRotation = (90 + this.beeRotation) % 360;
					this.moveTheBee(this.beeRotation, this.beePosition);
					break;
				case 3: // Go Down
					if (!this.moveTheBee(this.beeRotation, null, 2)) {
						this.makeTheBeeEyesBlinkRed();
					}
					break;
				case 4: // Rotate left
					this.beeRotation = (-90 + this.beeRotation) % 360;
					this.moveTheBee(this.beeRotation, this.beePosition);
					break;
				case 5: // Pause
					setTimeout(() => {}, this.intervals.pause);
					break;
				default:
					break;
			}
		});
	}

	reset() {
		this.deleteStepsHistory();
		this.resetBeeRotation();
		this.removeBee();
	}

	resetBeeRotation() {
		this.beeRotation = 0;
	}

	deleteStepsHistory() {
		this.beeSteps = [];
	}

	removeBee() {
		this.svg.getElementById('beeContainer').innerHTML = '';
	}

	pushSteps(actionID) {
		this.beeSteps.push(actionID);
	}

	async makeTheBeeEyesBlinkRed() {
		const bee = this.svg.querySelector('#beeContainer image');
		bee.setAttribute('href', `/img/bees/redEyed/${this.beeImageName}`);
		await setTimeout(async () => {
			bee.setAttribute('href', `/img/bees/regular/${this.beeImageName}`);
			await setTimeout(() => {
				if (this.eyesBlinkedCounter < 2) {
					this.eyesBlinkedCounter += 1;
					this.makeTheBeeEyesBlinkRed();
				} else {
					this.eyesBlinkedCounter = 0;
				}
			}, this.intervals.redEyes);
		}, this.intervals.redEyes);
	}
}
