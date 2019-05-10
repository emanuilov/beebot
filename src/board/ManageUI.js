import $ from 'jquery';
// import DrawingBoard from './drawingboard';
import ManageBoard from './ManageBoard';

const BoardManager = new ManageBoard();
$(document).ready(() => {
	const drawingBoard = new DrawingBoard.Board('drawing-board', {
		background: false,
		eraserColor: 'transparent',
		controls: false,
		webStorage: false,
		size: 6,
		color: '#1abc9c'
	});
	const beeImg = $('.bee-container img');
	const canvas = $(drawingBoard.canvas);
	let isTheMouseInTheCanvas = false;

	$('.board-manager .colors img').click(() => {
		drawingBoard.setColor($(this).data('color'));
	});

	$('.board-manager .tools span:first-of-type img').click(() => {
		drawingBoard.setMode($(this).data('mode'));
	});

	$('.bee-manager div *').click(() => {
		const actionID = $(this).data('action');
		if (actionID !== 7 && actionID !== 6) {
			BoardManager.pushSteps(actionID);
		} else if (actionID === 6) {
			BoardManager.runTheSteps();
		} else {
			drawingBoard.reset({
				background: true
			});
			BoardManager.resetTheBoard();
		}
	});

	canvas.on('dragenter', () => {
		isTheMouseInTheCanvas = true;
	});
	canvas.on('dragover', e => {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		return false;
	});
	canvas.on('dragleave', () => {
		isTheMouseInTheCanvas = false;
	});
	canvas.on('drop', e => {
		// this / e.target is current target element.

		if (e.stopPropagation) {
			e.stopPropagation(); // stops the browser from redirecting.
		}

		if (isTheMouseInTheCanvas) {
			BoardManager.insertImage(
				'bee',
				BoardManager.getBoxAndRowID(BoardManager.getMouseCoordinates(drawingBoard.canvas, e))
			);
			beeImg.remove();
		}

		return false;
	});
	beeImg.on('dragstart', () => {
		this.style.opacity = '0.4'; // this / e.target is the source node.
	});
	beeImg.on('dragend', () => {
		if (isTheMouseInTheCanvas) {
			$(this).remove();
			isTheMouseInTheCanvas = false;
		} else {
			$(this).css('opacity', 1);
		}
	});

	$('.board-manager .tools span:last-of-type img').click(() => {
		const newSize = parseInt($(this).data('size'), 10);
		drawingBoard.opts.size = newSize;
		drawingBoard.ctx.lineWidth = newSize;
	});
});
