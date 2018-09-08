$(document).ready(function () {
	var drawingBoard = new DrawingBoard.Board('drawing-board', {
			background: false,
			eraserColor: 'transparent',
			controls: false,
			webStorage: false,
			size: 6,
			color: '#1abc9c'
		}),
		isTheMouseInTheCanvas = false,
		beeImg = $('.bee-container img'),
		canvas = $(drawingBoard.canvas),
		beePosition = null,
		beeSteps = [],
		beeRotation = 0,
		intervals = {
			betweenActions: 500,
			pause: 1
		};

	canvas.on('dragenter', function () {
		isTheMouseInTheCanvas = true;
	});
	canvas.on('dragover', function (e) {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		return false;
	});
	canvas.on('dragleave', function () {
		isTheMouseInTheCanvas = false;
	});
	canvas.on('drop', function (e) {
		// this / e.target is current target element.

		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}

		if (isTheMouseInTheCanvas) {
			insertImage('bee', getBoxAndRowID(getMouseCoordinates(drawingBoard.canvas,
				e)));
			beeImg.remove();
		}

		return false;
	});
	beeImg.on('dragstart', function () {
		this.style.opacity = '0.4'; // this / e.target is the source node.
	});
	beeImg.on('dragend', function () {
		if (isTheMouseInTheCanvas) {
			$(this).remove();
			isTheMouseInTheCanvas = false;
		} else {
			$(this).css('opacity', 1);
		}
	});

	function runTheSteps() {
		beeSteps.forEach(function (beeStep) {
			switch (beeStep) {
				case 1:
					if (!moveTheBee(beeRotation, null, 1)) {
						makeTheBeeEyesRed();
						return;
					}
					break;
				case 2:
					beeRotation = (90 + beeRotation) % 360;
					moveTheBee(beeRotation, beePosition);
					break;
				case 3:
					setTimeout(
						function () {}, intervals.pause);
					break;
				case 4:
					if (!moveTheBee(beeRotation, null, 2)) {
						makeTheBeeEyesRed();
						return;
					}
					break;
				case 5:
					beeRotation = (-90 + beeRotation) % 360;
					moveTheBee(beeRotation, beePosition);
					break;
				default:
					break;
			}
		});
	}

	function makeTheBeeEyesRed() {}

	function getTheWantedPosition(direction, beeOrientation) {
		var movement = null,
			positionCopy = beePosition;
		if (direction == 1) {
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
		}
	}

	function checkIfTheMovementIsPossible(position) {
		if (position.boxID > 0 && position.boxID < 6 && position.rowID > 0 && position.rowID < 6) {
			return true;
		} else {
			return false;
		}
	}

	function getBeeOrientation() {
		switch (beeRotation) {
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

	function moveTheBee(rotation, newPosition, direction = null) {
		if (newPosition == null) {
			newPosition = getTheWantedPosition(direction, getBeeOrientation());
		}
		if (checkIfTheMovementIsPossible(newPosition)) {
			setTimeout(
				function () {
					var beeContainer = $($('embed')[0].getSVGDocument()).find('#beeContainer');
					beeContainer.empty();
					insertImage('bee', newPosition, rotation);
				}, intervals.betweenActions);
			return true;
		} else {
			return false;
		}
	}

	function getMouseCoordinates(canvas, event) {
		var rect = canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}

	function getBoxAndRowID(mouseCoordinates) {
		var coordinates = {
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
		} else
		if (mouseCoordinates.y <= 411) {
			coordinates.rowID = 3;
		} else if (mouseCoordinates.y <= 544) {
			coordinates.rowID = 4;
		} else {
			coordinates.rowID = 5;
		}

		return coordinates;
	}
	setTimeout(
		function () {
			insertImage('bee', {
				boxID: 1,
				rowID: 1
			}, 0);
		}, 500);


	function insertImage(imageName, imagePosition, rotation = 0) {
		var imageCoordinates = getBoxCoordinates(imagePosition);

		var image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		image.setAttribute('href', '/img/screen2/lessons/in-lesson-pictures/' + imageName + '.png');
		image.setAttribute('x', imageCoordinates.x);
		image.setAttribute('y', imageCoordinates.y);
		if (imageName == 'bee') {
			image.setAttribute('transform', 'rotate(' + rotation + ', ' + (62.5 + imageCoordinates.x) + ', ' + (62.5 + imageCoordinates.y) + ')');
			$('embed')[0].getSVGDocument().getElementById('beeContainer').appendChild(image);
			beePosition = imagePosition;
		} else {
			$('embed')[0].getSVGDocument().getElementById('lessonImages').appendChild(image);
		}
	}

	function getBoxCoordinates(imagePosition) {
		var defaultValues = {
			startBox: 15,
			nextBox: 134,
		};
		return {
			x: defaultValues.startBox + defaultValues.nextBox * (imagePosition.boxID - 1),
			y: defaultValues.startBox + defaultValues.nextBox * (imagePosition.rowID - 1)
		};
	}

	$('.board-manager .colors img').click(function () {
		drawingBoard.setColor($(this).data('color'));
	});

	$('.board-manager .tools span:first-of-type img').click(function () {
		drawingBoard.setMode($(this).data('mode'));
	});

	$('.bee-manager div *').click(function () {
		var actionID = $(this).data('action');
		if (actionID != 7 && actionID != 6) {
			beeSteps.push(actionID);
		} else if (actionID == 6) {
			runTheSteps();
		} else {
			resetTheBoard();
		}
	});

	function resetTheBoard() {
		beeSteps = [];
		drawingBoard.reset({
			background: true
		});
		$($('embed')[0].getSVGDocument()).find('#beeContainer').empty();
		var beeContainer = $('.bee-container');
		beeContainer.empty();
		beeContainer.append('<img src="./img/screen2/lessons/in-lesson-pictures/bee.png" alt="Bee">');
	}

	$('.board-manager .tools span:last-of-type img').click(function () {
		var newSize = parseInt($(this).data('size'));
		drawingBoard.opts.size = newSize;
		drawingBoard.ctx.lineWidth = newSize;
	});
});