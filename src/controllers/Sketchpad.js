/* This is an altered implementation of the npm module sketchpad */

export default class Sketchpad {
	constructor(options) {
		let canvas = options.element;
		if (!canvas) {
			// eslint-disable-next-line no-console
			console.error('[SKETCHPAD]: Please provide an element/canvas:');
			return;
		}

		if (typeof canvas === 'string') {
			canvas = document.querySelector(canvas);
		}

		this.canvas = canvas;

		this.canvas.width = this.canvas.clientWidth * (options.scale ? options.scale : 1);
		this.canvas.height = this.canvas.clientHeight * (options.scale ? options.scale : 1);

		this.canvasPosition = {
			left: this.canvas.getBoundingClientRect().left,
			top: this.canvas.getBoundingClientRect().top
		};

		// Try to extract 'width', 'height', 'color', 'penSize' and 'readOnly'
		// from the options or the DOM element.
		['width', 'height', 'color', 'penSize', 'readOnly'].forEach(attr => {
			this[attr] = options[attr] || this.canvas.getAttribute(`data-${attr}`);
		}, this);

		this.color = this.color || '#1abc9c';
		this.penSize = this.penSize || 5;

		this.readOnly = this.readOnly || false;

		// Sketchpad History settings
		this.strokes = options.strokes || [];

		this.undoHistory = options.undoHistory || [];

		// Enforce context for Moving Callbacks
		this.onMouseMove = this.onMouseMove.bind(this);

		// Setup Internal Events
		this.events = {};
		this.events.mousemove = [];
		this.internalEvents = ['MouseDown', 'MouseUp', 'MouseOut'];
		this.internalEvents.forEach(name => {
			const lower = name.toLowerCase();
			this.events[lower] = [];

			// Enforce context for Internal Event Functions
			this[`on${name}`] = this[`on${name}`].bind(this);

			// Add DOM Event Listeners
			this.canvas.addEventListener(lower, (...args) => this.trigger(lower, args));
		}, this);

		this.load();
	}

	position(event) {
		return {
			x: event.pageX - this.canvasPosition.left,
			y: event.pageY - this.canvasPosition.top
		};
	}

	stroke(stroke) {
		if (stroke.type === 'clear') {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			return;
		}

		stroke.lines.forEach(line => {
			this.line(line.start, line.end, stroke.color, stroke.size);
		}, this);
	}

	draw(start, end, color, size) {
		this.line(start, end, color, size, 'source-over');
	}

	line(start, end, color, size, compositeOperation) {
		this.context.save();
		this.context.lineJoin = 'round';
		this.context.lineCap = 'round';
		this.context.strokeStyle = color;
		this.context.lineWidth = size;
		this.context.globalCompositeOperation = compositeOperation;
		this.context.beginPath();
		this.context.moveTo(start.x, start.y);
		this.context.lineTo(end.x, end.y);
		this.context.closePath();
		this.context.stroke();
		this.context.restore();
	}

	/*
	 * Events/Callback
	 */

	onMouseDown(event) {
		this.sketching = true;
		this.lastPosition = this.position(event);
		this.currentStroke = {
			color: this.color,
			size: this.penSize,
			lines: []
		};

		this.canvas.addEventListener('mousemove', this.onMouseMove);
	}

	onMouseUp() {
		if (this.sketching) {
			this.strokes.push(this.currentStroke);
			this.sketching = false;
		}

		this.canvas.removeEventListener('mousemove', this.onMouseMove);
	}

	onMouseOut() {
		this.onMouseUp();
	}

	onMouseMove(event) {
		const currentPosition = this.position(event);
		this.draw(this.lastPosition, currentPosition, this.color, this.penSize);
		this.currentStroke.lines.push({
			start: this.lastPosition,
			end: currentPosition
		});
		this.lastPosition = currentPosition;

		this.trigger('mousemove', [event]);
	}

	toObject() {
		return {
			width: this.canvas.clientWidth,
			height: this.canvas.clientHeight,
			strokes: this.strokes,
			undoHistory: this.undoHistory
		};
	}

	toJSON() {
		return JSON.stringify(this.toObject());
	}

	redo() {
		const stroke = this.undoHistory.pop();
		if (stroke) {
			this.strokes.push(stroke);
			this.stroke(stroke);
		}
	}

	undo() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		const stroke = this.strokes.pop();
		this.redraw();

		if (stroke) {
			this.undoHistory.push(stroke);
		}
	}

	clear() {
		this.strokes.push({
			type: 'clear'
		});
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	redraw() {
		this.strokes.forEach(stroke => {
			this.stroke(stroke);
		}, this);
	}

	load() {
		// Setup canvas
		this.context = this.canvas.getContext('2d');

		// Redraw image
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.redraw();

		if (this.readOnly) {
			return;
		}

		// Re-Attach all event listeners
		this.internalEvents.forEach(name => this.on(name.toLowerCase(), this[`on${name}`]));
	}

	cancelAnimation() {
		this.animateIds = this.animateIds || [];
		this.animateIds.forEach(id => {
			clearTimeout(id);
		});
		this.animateIds = [];
	}

	animate(interval = 10, loop = false, loopInterval = 0) {
		let delay = interval;

		this.cancelAnimation();
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.strokes.forEach(stroke => {
			if (stroke.type === 'clear') {
				delay += interval;
				this.animateIds.push(
					setTimeout(() => {
						this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
					}, delay)
				);
				return;
			}

			stroke.lines.forEach(line => {
				delay += interval;
				this.animateIds.push(
					setTimeout(() => {
						this.draw(line.start, line.end, stroke.color, stroke.size);
					}, delay)
				);
			});
		});

		if (loop) {
			this.animateIds.push(
				setTimeout(() => {
					this.animate(interval, loop, loopInterval);
				}, delay + interval + loopInterval)
			);
		}

		this.animateIds(
			setTimeout(() => {
				this.trigger('animation-end', [interval, loop, loopInterval]);
			}, delay + interval)
		);
	}

	/*
	 * Event System
	 */

	/* Attach an event callback
	 *
	 * @param {String} action Which action will have a callback attached
	 * @param {Function} callback What will be executed when this event happen
	 */
	on(action, callback) {
		// Tell the user if the action he has input was invalid
		if (this.events[action] === undefined) {
			// eslint-disable-next-line no-console
			console.error(`Sketchpad: No such action '${action}'`);
			return;
		}

		this.events[action].push(callback);
	}

	/* Trigger an event
	 *
	 * @param {String} action Which event will be triggered
	 * @param {Array} args Which arguments will be provided to the callbacks
	 */
	trigger(action, args = []) {
		// Fire all events with the given callback
		this.events[action].forEach(callback => {
			callback(...args);
		});
	}
}
