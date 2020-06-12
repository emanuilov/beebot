export default class BeeMovement {
	constructor(embed, beeImageName) {
		this.beePosition = null;
		this.beeSteps = [];
		this.beeRotation = 0;
		this.intervals = {
			movement: 500,
			pause: 1500,
			redEyes: 600
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
				defaultValues.box * (imagePosition.columnID - 1) +
				defaultValues.grid * (imagePosition.columnID - 1),
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
		image.setAttribute('style', 'transition: all ease 0.6s;');
		image.setAttribute('width', 125);
		image.setAttribute('height', 125);
		if (imageName) {
			image.setAttribute('href', `/img/lesson-pictures/${imageName}`);
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
			columnID: null
		};
		if (mouseCoordinates.x >= 15) {
			if (mouseCoordinates.x <= 133) {
				coordinates.columnID = 1;
			} else if (mouseCoordinates.x <= 257) {
				coordinates.columnID = 2;
			} else if (mouseCoordinates.x <= 381) {
				coordinates.columnID = 3;
			} else if (mouseCoordinates.x <= 505) {
				coordinates.columnID = 4;
			} else if (mouseCoordinates.x <= 629) {
				coordinates.columnID = 5;
			} else {
				coordinates.columnID = 6;
			}
		} else {
			coordinates.columnID = 0;
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
		if (
			position.columnID > 0 &&
			position.columnID < 6 &&
			position.rowID > 0 &&
			position.rowID < 6
		) {
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
					positionCopy.columnID += 1;
				} else {
					positionCopy.columnID -= 1;
				}
				return positionCopy;
			case 3: // Down
				if (direction === 1) {
					positionCopy.rowID += 1;
				} else {
					positionCopy.rowID -= 1;
				}
				return positionCopy;
			case 4: // Left
				if (direction === 1) {
					positionCopy.columnID -= 1;
				} else {
					positionCopy.columnID += 1;
				}
				return positionCopy;
			default:
				return positionCopy;
		}
	}

	moveTheBee(rotation, direction = null) {
		return new Promise(resolve => {
			let result = false;
			let newPosition = this.beePosition;
			// Not rotating
			if (direction) {
				newPosition = this.getNewPosition(direction, this.getBeeOrientation());
			}
			if (this.checkIfTheMovementIsPossible(newPosition)) {
				this.beePosition = newPosition;
				const bee = this.svg.querySelector('#beeContainer image');
				const imageCoordinates = this.getBoxCoordinates(newPosition);
				bee.setAttribute('x', imageCoordinates.x);
				bee.setAttribute('y', imageCoordinates.y);
				bee.setAttribute(
					'transform',
					`rotate(${rotation}, ${62.5 + imageCoordinates.x}, ${62.5 + imageCoordinates.y})`
				);
				result = true;
			}

			setTimeout(() => {
				resolve(result);
			}, this.intervals.movement);
		});
	}

	async runTheSteps() {
		// eslint-disable-next-line no-restricted-syntax
		for (const beeStep of this.beeSteps) {
			switch (beeStep) {
				case 1: // Go up
					// eslint-disable-next-line no-await-in-loop
					if (!(await this.moveTheBee(this.beeRotation, 1))) {
						this.makeTheBeeEyesBlinkRed();
					}
					break;
				case 2: // Rotate right
					this.beeRotation = (90 + this.beeRotation) % 360;
					// eslint-disable-next-line no-await-in-loop
					await this.moveTheBee(this.beeRotation);
					break;
				case 3: // Go Down
					// eslint-disable-next-line no-await-in-loop
					if (!(await this.moveTheBee(this.beeRotation, 2))) {
						this.makeTheBeeEyesBlinkRed();
					}
					break;
				case 4: // Rotate left
					this.beeRotation = (-90 + this.beeRotation) % 360;
					if (this.beeRotation === -90) {
						this.beeRotation = 270;
					}

					// eslint-disable-next-line no-await-in-loop
					await this.moveTheBee(this.beeRotation);
					break;
				case 5: // Pause
					// eslint-disable-next-line no-await-in-loop
					await this.wait();
					break;
				default:
					break;
			}
		}
	}

	wait() {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, this.intervals.pause);
		});
	}

	reset() {
		this.removeBee();
		this.deleteStepsHistory();
		this.resetBeeRotation();
		this.makeTheBeeEyesBlinkRed();
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

	makeTheBeeEyesBlinkRed() {
		const bee = this.svg.querySelector('#beeContainer image');
		if (bee) {
			bee.setAttribute('href', `/img/bees/redEyed/${this.beeImageName}`);
			setTimeout(async () => {
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
}
