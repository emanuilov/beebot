/* drawingboard.js v0.4.6 - https://github.com/Leimi/drawingboard.js
 * Copyright (c) 2015 Emmanuel Pelletier
 * Licensed MIT */
(function() {
	/**
	 * SimpleUndo is a very basic javascript undo/redo stack for managing histories of basically anything.
	 *
	 * options are: {
	 * 	* `provider` : required. a function to call on `save`, which should provide the current state of the historized object through the given "done" callback
	 * 	* `maxLength` : the maximum number of items in history
	 * 	* `opUpdate` : a function to call to notify of changes in history. Will be called on `save`, `undo`, `redo` and `clear`
	 * }
	 *
	 */
	const SimpleUndo = function(options) {
		const settings = options || {};
		const defaultOptions = {
			provider() {
				throw new Error('No provider!');
			},
			maxLength: 30,
			onUpdate() {}
		};

		this.provider =
			typeof settings.provider !== 'undefined' ? settings.provider : defaultOptions.provider;
		this.maxLength =
			typeof settings.maxLength !== 'undefined' ? settings.maxLength : defaultOptions.maxLength;
		this.onUpdate =
			typeof settings.onUpdate !== 'undefined' ? settings.onUpdate : defaultOptions.onUpdate;

		this.initialItem = null;
		this.clear();
	};

	function truncate(stack, limit) {
		while (stack.length > limit) {
			stack.shift();
		}
	}

	SimpleUndo.prototype.initialize = function(initialItem) {
		this.stack[0] = initialItem;
		this.initialItem = initialItem;
	};

	SimpleUndo.prototype.clear = function() {
		this.stack = [this.initialItem];
		this.position = 0;
		this.onUpdate();
	};

	SimpleUndo.prototype.save = function() {
		this.provider(
			function(current) {
				truncate(this.stack, this.maxLength);
				this.position = Math.min(this.position, this.stack.length - 1);

				this.stack = this.stack.slice(0, this.position + 1);
				this.stack.push(current);
				this.position++;
				this.onUpdate();
			}.bind(this)
		);
	};

	SimpleUndo.prototype.undo = function(callback) {
		if (this.canUndo()) {
			const item = this.stack[--this.position];
			this.onUpdate();

			if (callback) {
				callback(item);
			}
		}
	};

	SimpleUndo.prototype.redo = function(callback) {
		if (this.canRedo()) {
			const item = this.stack[++this.position];
			this.onUpdate();

			if (callback) {
				callback(item);
			}
		}
	};

	SimpleUndo.prototype.canUndo = function() {
		return this.position > 0;
	};

	SimpleUndo.prototype.canRedo = function() {
		return this.position < this.count();
	};

	SimpleUndo.prototype.count = function() {
		return this.stack.length - 1; // -1 because of initial item
	};

	// exports
	// node module
	if (typeof module !== 'undefined') {
		module.exports = SimpleUndo;
	}

	// browser global
	if (typeof window !== 'undefined') {
		window.SimpleUndo = SimpleUndo;
	}
})();
window.DrawingBoard = typeof DrawingBoard !== 'undefined' ? DrawingBoard : {};

DrawingBoard.Utils = {};

/*!
 * Tim (lite)
 *   github.com/premasagar/tim
 */
/*
	A tiny, secure JavaScript micro-templating script.
*/
DrawingBoard.Utils.tpl = (function() {
	const start = '{{';
	const end = '}}';
	const path = '[a-z0-9_][\\.a-z0-9_]*'; // e.g. config.person.name
	const pattern = new RegExp(`${start}\\s*(${path})\\s*${end}`, 'gi');
	let undef;

	return function(template, data) {
		// Merge data into the template string
		return template.replace(pattern, function(tag, token) {
			const path = token.split('.');
			const len = path.length;
			let lookup = data;
			let i = 0;

			for (; i < len; i++) {
				lookup = lookup[path[i]];

				// Property not found
				if (lookup === undef) {
					throw `tim: '${path[i]}' not found in ${tag}`;
				}

				// Return the required value
				if (i === len - 1) {
					return lookup;
				}
			}
		});
	};
})();

/**
 * https://github.com/jeromeetienne/microevent.js
 * MicroEvent - to make any js object an event emitter (server or browser)
 *
 * - pure javascript - server compatible, browser compatible
 * - dont rely on the browser doms
 * - super simple - you get it immediatly, no mistery, no magic involved
 *
 * - create a MicroEventDebug with goodies to debug
 *   - make it safer to use
 */
DrawingBoard.Utils.MicroEvent = function() {};

DrawingBoard.Utils.MicroEvent.prototype = {
	bind(event, fct) {
		this._events = this._events || {};
		this._events[event] = this._events[event] || [];
		this._events[event].push(fct);
	},
	unbind(event, fct) {
		this._events = this._events || {};
		if (event in this._events === false) return;
		this._events[event].splice(this._events[event].indexOf(fct), 1);
	},
	trigger(event /* , args... */) {
		this._events = this._events || {};
		if (event in this._events === false) return;
		for (let i = 0; i < this._events[event].length; i++) {
			this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
		}
	}
};

// I know.
DrawingBoard.Utils._boxBorderSize = function($el, withPadding, withMargin, direction) {
	withPadding = !!withPadding || true;
	withMargin = !!withMargin || false;
	let width = 0;
	let props;
	if (direction == 'width') {
		props = ['border-left-width', 'border-right-width'];
		if (withPadding) props.push('padding-left', 'padding-right');
		if (withMargin) props.push('margin-left', 'margin-right');
	} else {
		props = ['border-top-width', 'border-bottom-width'];
		if (withPadding) props.push('padding-top', 'padding-bottom');
		if (withMargin) props.push('margin-top', 'margin-bottom');
	}
	for (let i = props.length - 1; i >= 0; i--)
		width += parseInt($el.css(props[i]).replace('px', ''), 10);
	return width;
};

DrawingBoard.Utils.boxBorderWidth = function($el, withPadding, withMargin) {
	return DrawingBoard.Utils._boxBorderSize($el, withPadding, withMargin, 'width');
};

DrawingBoard.Utils.boxBorderHeight = function($el, withPadding, withMargin) {
	return DrawingBoard.Utils._boxBorderSize($el, withPadding, withMargin, 'height');
};

DrawingBoard.Utils.isColor = function(string) {
	if (!string || !string.length) return false;
	return (
		/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string) ||
		$.inArray(string.substring(0, 3), ['rgb', 'hsl']) !== -1
	);
};

/**
 * Packs an RGB color into a single integer.
 */
DrawingBoard.Utils.RGBToInt = function(r, g, b) {
	let c = 0;
	c |= (r & 255) << 16;
	c |= (g & 255) << 8;
	c |= b & 255;
	return c;
};

/**
 * Returns informations on the pixel located at (x,y).
 */
DrawingBoard.Utils.pixelAt = function(image, x, y) {
	const i = (y * image.width + x) * 4;
	const c = DrawingBoard.Utils.RGBToInt(image.data[i], image.data[i + 1], image.data[i + 2]);

	return [
		i, // INDEX
		x, // X
		y, // Y
		c // COLOR
	];
};

/**
 * Compares two colors with the given tolerance (between 0 and 255).
 */
DrawingBoard.Utils.compareColors = function(a, b, tolerance) {
	if (tolerance === 0) {
		return a === b;
	}

	const ra = (a >> 16) & 255;
	const rb = (b >> 16) & 255;
	const ga = (a >> 8) & 255;
	const gb = (b >> 8) & 255;
	const ba = a & 255;
	const bb = b & 255;

	return (
		Math.abs(ra - rb) <= tolerance &&
		Math.abs(ga - gb) <= tolerance &&
		Math.abs(ba - bb) <= tolerance
	);
};

(function() {
	const vendors = ['ms', 'moz', 'webkit', 'o'];
	for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
		window.cancelAnimationFrame =
			window[`${vendors[x]}CancelAnimationFrame`] ||
			window[`${vendors[x]}CancelRequestAnimationFrame`];
	}
})();

window.DrawingBoard = typeof DrawingBoard !== 'undefined' ? DrawingBoard : {};

/**
 * pass the id of the html element to put the drawing board into
 * and some options : {
 *	controls: array of controls to initialize with the drawingboard. 'Colors', 'Size', and 'Navigation' by default
 *		instead of simple strings, you can pass an object to define a control opts
 *		ie ['Color', { Navigation: { reset: false }}]
 *	controlsPosition: "top left" by default. Define where to put the controls: at the "top" or "bottom" of the canvas, aligned to "left"/"right"/"center"
 *	background: background of the drawing board. Give a hex color or an image url "#ffffff" (white) by default
 *	color: pencil color ("#000000" by default)
 *	size: pencil size (3 by default)
 *	webStorage: 'session', 'local' or false ('session' by default). store the current drawing in session or local storage and restore it when you come back
 *	droppable: true or false (false by default). If true, dropping an image on the canvas will include it and allow you to draw on it,
 *	errorMessage: html string to put in the board's element on browsers that don't support canvas.
 *	stretchImg: default behavior of image setting on the canvas: set to the canvas width/height or not? false by default
 * }
 */
DrawingBoard.Board = function(id, opts) {
	this.opts = this.mergeOptions(opts);

	this.ev = new DrawingBoard.Utils.MicroEvent();

	this.id = id;
	this.$el = $(document.getElementById(id));
	if (!this.$el.length) return false;

	let tpl =
		'<div class="drawing-board-canvas-wrapper"></canvas><canvas class="drawing-board-canvas"></canvas><div class="drawing-board-cursor drawing-board-utils-hidden"></div></div>';
	if (this.opts.controlsPosition.indexOf('bottom') > -1)
		tpl += '<div class="drawing-board-controls"></div>';
	else tpl = `<div class="drawing-board-controls"></div>${tpl}`;

	this.$el.addClass('drawing-board').append(tpl);
	this.dom = {
		$canvasWrapper: this.$el.find('.drawing-board-canvas-wrapper'),
		$canvas: this.$el.find('.drawing-board-canvas'),
		$cursor: this.$el.find('.drawing-board-cursor'),
		$controls: this.$el.find('.drawing-board-controls')
	};

	$.each(
		['left', 'right', 'center'],
		$.proxy(function(n, val) {
			if (this.opts.controlsPosition.indexOf(val) > -1) {
				this.dom.$controls.attr('data-align', val);
				return false;
			}
		}, this)
	);

	this.canvas = this.dom.$canvas.get(0);
	this.ctx =
		this.canvas && this.canvas.getContext && this.canvas.getContext('2d')
			? this.canvas.getContext('2d')
			: null;
	this.color = this.opts.color;

	if (!this.ctx) {
		if (this.opts.errorMessage) this.$el.html(this.opts.errorMessage);
		return false;
	}

	this.storage = this._getStorage();

	this.initHistory();
	// init default board values before controls are added (mostly pencil color and size)
	this.reset({
		webStorage: false,
		history: false,
		background: false
	});
	// init controls (they will need the default board values to work like pencil color and size)
	this.initControls();
	// set board's size after the controls div is added
	this.resize();
	// reset the board to take all resized space
	this.reset({
		webStorage: false,
		history: false,
		background: true
	});
	this.restoreWebStorage();
	this.initDropEvents();
	this.initDrawEvents();
};

DrawingBoard.Board.defaultOpts = {
	controls: ['Color', 'DrawingMode', 'Size', 'Navigation'],
	controlsPosition: 'top left',
	color: '#000000',
	size: 1,
	background: '#fff',
	eraserColor: 'background',
	fillTolerance: 100,
	fillHack: true, // try to prevent issues with anti-aliasing with a little hack by default
	webStorage: 'session',
	droppable: false,
	enlargeYourContainer: false,
	errorMessage:
		'<p>It seems you use an obsolete browser. <a href="http://browsehappy.com/" target="_blank">Update it</a> to start drawing.</p>',
	stretchImg: false // when setting the canvas img, strech the image at the whole canvas size when this opt is true
};

DrawingBoard.Board.prototype = {
	mergeOptions(opts) {
		opts = $.extend({}, DrawingBoard.Board.defaultOpts, opts);
		if (!opts.background && opts.eraserColor === 'background') opts.eraserColor = 'transparent';
		return opts;
	},

	/**
	 * Canvas reset/resize methods: put back the canvas to its default values
	 *
	 * depending on options, can set color, size, background back to default values
	 * and store the reseted canvas in webstorage and history queue
	 *
	 * resize values depend on the `enlargeYourContainer` option
	 */

	reset(opts) {
		opts = $.extend(
			{
				color: this.opts.color,
				size: this.opts.size,
				webStorage: true,
				history: true,
				background: false
			},
			opts
		);

		this.setMode('pencil');

		if (opts.background) {
			this.resetBackground(
				this.opts.background,
				$.proxy(function() {
					if (opts.history) this.saveHistory();
				}, this)
			);
		}

		if (opts.color) this.setColor(opts.color);
		if (opts.size) this.ctx.lineWidth = opts.size;

		this.ctx.lineCap = 'round';
		this.ctx.lineJoin = 'round';
		// this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.width);

		if (opts.webStorage) this.saveWebStorage();

		// if opts.background we already dealt with the history
		if (opts.history && !opts.background) this.saveHistory();

		this.blankCanvas = this.getImg();

		this.ev.trigger('board:reset', opts);
	},

	resetBackground(background, callback) {
		background = background || this.opts.background;

		const bgIsColor = DrawingBoard.Utils.isColor(background);
		const prevMode = this.getMode();
		this.setMode('pencil');
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
		if (bgIsColor) {
			this.ctx.fillStyle = background;
			this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			this.history.initialize(this.getImg());
			if (callback) callback();
		} else if (background)
			this.setImg(background, {
				callback: $.proxy(function() {
					this.history.initialize(this.getImg());
					if (callback) callback();
				}, this)
			});
		this.setMode(prevMode);
	},

	resize() {
		this.dom.$controls.toggleClass(
			'drawing-board-controls-hidden',
			!this.controls || !this.controls.length
		);

		let canvasWidth;
		let canvasHeight;
		const widths = [
			this.$el.width(),
			DrawingBoard.Utils.boxBorderWidth(this.$el),
			DrawingBoard.Utils.boxBorderWidth(this.dom.$canvasWrapper, true, true)
		];
		const heights = [
			this.$el.height(),
			DrawingBoard.Utils.boxBorderHeight(this.$el),
			this.dom.$controls.height(),
			DrawingBoard.Utils.boxBorderHeight(this.dom.$controls, false, true),
			DrawingBoard.Utils.boxBorderHeight(this.dom.$canvasWrapper, true, true)
		];
		const sum = function(values, multiplier) {
			// make the sum of all array values
			multiplier = multiplier || 1;
			let res = values[0];
			for (let i = 1; i < values.length; i++) {
				res += values[i] * multiplier;
			}
			return res;
		};
		const sub = function(values) {
			return sum(values, -1);
		}; // substract all array values from the first one

		if (this.opts.enlargeYourContainer) {
			canvasWidth = this.$el.width();
			canvasHeight = this.$el.height();

			this.$el.width(sum(widths));
			this.$el.height(sum(heights));
		} else {
			canvasWidth = sub(widths);
			canvasHeight = sub(heights);
		}

		this.dom.$canvasWrapper.css('width', `${canvasWidth}px`);
		this.dom.$canvasWrapper.css('height', `${canvasHeight}px`);

		this.dom.$canvas.css('width', `${canvasWidth}px`);
		this.dom.$canvas.css('height', `${canvasHeight}px`);

		this.canvas.width = canvasWidth;
		this.canvas.height = canvasHeight;
	},

	/**
	 * Controls:
	 * the drawing board can has various UI elements to control it.
	 * one control is represented by a class in the namespace DrawingBoard.Control
	 * it must have a $el property (jQuery object), representing the html element to append on the drawing board at initialization.
	 *
	 */

	initControls() {
		this.controls = [];
		if (!this.opts.controls.length || !DrawingBoard.Control) return false;
		for (let i = 0; i < this.opts.controls.length; i++) {
			let c = null;
			if (typeof this.opts.controls[i] === 'string')
				c = new window.DrawingBoard.Control[this.opts.controls[i]](this);
			else if (typeof this.opts.controls[i] === 'object') {
				for (var controlName in this.opts.controls[i]) break;
				c = new window.DrawingBoard.Control[controlName](this, this.opts.controls[i][controlName]);
			}
			if (c) {
				this.addControl(c);
			}
		}
	},

	// add a new control or an existing one at the position you want in the UI
	// to add a totally new control, you can pass a string with the js class as 1st parameter and control options as 2nd ie "addControl('Navigation', { reset: false }"
	// the last parameter (2nd or 3rd depending on the situation) is always the position you want to place the control at
	addControl(control, optsOrPos, pos) {
		if (
			typeof control !== 'string' &&
			(typeof control !== 'object' || !(control instanceof DrawingBoard.Control))
		)
			return false;

		const opts = typeof optsOrPos === 'object' ? optsOrPos : {};
		pos = pos ? pos * 1 : typeof optsOrPos === 'number' ? optsOrPos : null;

		if (typeof control === 'string') control = new window.DrawingBoard.Control[control](this, opts);

		if (pos)
			this.dom.$controls
				.children()
				.eq(pos)
				.before(control.$el);
		else this.dom.$controls.append(control.$el);

		if (!this.controls) this.controls = [];
		this.controls.push(control);
		this.dom.$controls.removeClass('drawing-board-controls-hidden');
	},

	/**
	 * History methods: undo and redo drawed lines
	 */

	initHistory() {
		this.history = new SimpleUndo({
			maxLength: 30,
			provider: $.proxy(function(done) {
				done(this.getImg());
			}, this),
			onUpdate: $.proxy(function() {
				this.ev.trigger('historyNavigation');
			}, this)
		});
	},

	saveHistory() {
		this.history.save();
	},

	restoreHistory(image) {
		this.setImg(image, {
			callback: $.proxy(function() {
				this.saveWebStorage();
			}, this)
		});
	},

	goBackInHistory() {
		this.history.undo($.proxy(this.restoreHistory, this));
	},

	goForthInHistory() {
		this.history.redo($.proxy(this.restoreHistory, this));
	},

	/**
	 * Image methods: you can directly put an image on the canvas, get it in base64 data url or start a download
	 */

	setImg(src, opts) {
		opts = $.extend(
			{
				stretch: this.opts.stretchImg,
				callback: null
			},
			opts
		);

		const { ctx } = this;
		const img = new Image();
		const oldGCO = ctx.globalCompositeOperation;
		img.onload = function() {
			ctx.globalCompositeOperation = 'source-over';
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

			if (opts.stretch) {
				ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
			} else {
				ctx.drawImage(img, 0, 0);
			}

			ctx.globalCompositeOperation = oldGCO;

			if (opts.callback) {
				opts.callback();
			}
		};
		img.src = src;
	},

	getImg() {
		return this.canvas.toDataURL('image/png');
	},

	downloadImg() {
		let img = this.getImg();
		img = img.replace('image/png', 'image/octet-stream');
		window.location.href = img;
	},

	/**
	 * WebStorage handling : save and restore to local or session storage
	 */

	saveWebStorage() {
		if (window[this.storage]) {
			window[this.storage].setItem(`drawing-board-${this.id}`, this.getImg());
			this.ev.trigger(
				`board:save${this.storage.charAt(0).toUpperCase()}${this.storage.slice(1)}`,
				this.getImg()
			);
		}
	},

	restoreWebStorage() {
		if (window[this.storage] && window[this.storage].getItem(`drawing-board-${this.id}`) !== null) {
			this.setImg(window[this.storage].getItem(`drawing-board-${this.id}`));
			this.ev.trigger(
				`board:restore${this.storage.charAt(0).toUpperCase()}${this.storage.slice(1)}`,
				window[this.storage].getItem(`drawing-board-${this.id}`)
			);
		}
	},

	clearWebStorage() {
		if (window[this.storage] && window[this.storage].getItem(`drawing-board-${this.id}`) !== null) {
			window[this.storage].removeItem(`drawing-board-${this.id}`);
			this.ev.trigger(`board:clear${this.storage.charAt(0).toUpperCase()}${this.storage.slice(1)}`);
		}
	},

	_getStorage() {
		if (
			!this.opts.webStorage ||
			!(this.opts.webStorage === 'session' || this.opts.webStorage === 'local')
		)
			return false;
		return `${this.opts.webStorage}Storage`;
	},

	/**
	 * Drop an image on the canvas to draw on it
	 */

	initDropEvents() {
		if (!this.opts.droppable) return false;

		this.dom.$canvas.on('dragover dragenter drop', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});

		this.dom.$canvas.on('drop', $.proxy(this._onCanvasDrop, this));
	},

	_onCanvasDrop(e) {
		e = e.originalEvent ? e.originalEvent : e;
		const { files } = e.dataTransfer;
		if (!files || !files.length || files[0].type.indexOf('image') == -1 || !window.FileReader)
			return false;
		const fr = new FileReader();
		fr.readAsDataURL(files[0]);
		fr.onload = $.proxy(function(ev) {
			this.setImg(ev.target.result, {
				callback: $.proxy(function() {
					this.saveHistory();
				}, this)
			});
			this.ev.trigger('board:imageDropped', ev.target.result);
			this.ev.trigger('board:userAction');
		}, this);
	},

	/**
	 * set and get current drawing mode
	 *
	 * possible modes are "pencil" (draw normally), "eraser" (draw transparent, like, erase, you know), "filler" (paint can)
	 */

	setMode(newMode, silent) {
		silent = silent || false;
		newMode = newMode || 'pencil';

		this.ev.unbind('board:startDrawing', $.proxy(this.fill, this));

		if (this.opts.eraserColor === 'transparent')
			this.ctx.globalCompositeOperation = newMode === 'eraser' ? 'destination-out' : 'source-over';
		else {
			if (newMode === 'eraser') {
				if (
					this.opts.eraserColor === 'background' &&
					DrawingBoard.Utils.isColor(this.opts.background)
				)
					this.ctx.strokeStyle = this.opts.background;
				else if (DrawingBoard.Utils.isColor(this.opts.eraserColor))
					this.ctx.strokeStyle = this.opts.eraserColor;
			} else if (!this.mode || this.mode === 'eraser') {
				this.ctx.strokeStyle = this.color;
			}

			if (newMode === 'filler') this.ev.bind('board:startDrawing', $.proxy(this.fill, this));
		}
		this.mode = newMode;
		if (!silent) this.ev.trigger('board:mode', this.mode);
	},

	getMode() {
		return this.mode || 'pencil';
	},

	setColor(color) {
		const that = this;
		color = color || this.color;
		if (!DrawingBoard.Utils.isColor(color)) return false;
		this.color = color;
		if (this.opts.eraserColor !== 'transparent' && this.mode === 'eraser') {
			var setStrokeStyle = function(mode) {
				if (mode !== 'eraser') that.strokeStyle = that.color;
				that.ev.unbind('board:mode', setStrokeStyle);
			};
			this.ev.bind('board:mode', setStrokeStyle);
		} else this.ctx.strokeStyle = this.color;
	},

	/**
	 * Fills an area with the current stroke color.
	 */
	fill(e) {
		if (this.getImg() === this.blankCanvas) {
			this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			this.ctx.fillStyle = this.color;
			this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
			return;
		}

		const img = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

		// constants identifying pixels components
		const INDEX = 0;
		const X = 1;
		const Y = 2;
		const COLOR = 3;

		// target color components
		const stroke = this.ctx.strokeStyle;
		const r = parseInt(stroke.substr(1, 2), 16);
		const g = parseInt(stroke.substr(3, 2), 16);
		const b = parseInt(stroke.substr(5, 2), 16);

		// starting point
		const start = DrawingBoard.Utils.pixelAt(
			img,
			parseInt(e.coords.x, 10),
			parseInt(e.coords.y, 10)
		);
		const startColor = start[COLOR];
		const tolerance = this.opts.fillTolerance;
		const useHack = this.opts.fillHack; // see https://github.com/Leimi/drawingboard.js/pull/38

		// no need to continue if starting and target colors are the same
		if (
			DrawingBoard.Utils.compareColors(startColor, DrawingBoard.Utils.RGBToInt(r, g, b), tolerance)
		)
			return;

		// pixels to evaluate
		const queue = [start];

		// loop vars
		let pixel;
		const maxX = img.width - 1;
		const maxY = img.height - 1;

		function updatePixelColor(pixel) {
			img.data[pixel[INDEX]] = r;
			img.data[pixel[INDEX] + 1] = g;
			img.data[pixel[INDEX] + 2] = b;
		}

		while ((pixel = queue.pop())) {
			if (useHack) updatePixelColor(pixel);

			if (DrawingBoard.Utils.compareColors(pixel[COLOR], startColor, tolerance)) {
				if (!useHack) updatePixelColor(pixel);
				if (pixel[X] > 0)
					// west
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X] - 1, pixel[Y]));
				if (pixel[X] < maxX)
					// east
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X] + 1, pixel[Y]));
				if (pixel[Y] > 0)
					// north
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X], pixel[Y] - 1));
				if (pixel[Y] < maxY)
					// south
					queue.push(DrawingBoard.Utils.pixelAt(img, pixel[X], pixel[Y] + 1));
			}
		}

		this.ctx.putImageData(img, 0, 0);
	},

	/**
	 * Drawing handling, with mouse or touch
	 */

	initDrawEvents() {
		this.isDrawing = false;
		this.isMouseHovering = false;
		this.coords = {};
		this.coords.old = this.coords.current = this.coords.oldMid = {
			x: 0,
			y: 0
		};

		this.dom.$canvas.on(
			'mousedown touchstart',
			$.proxy(function(e) {
				this._onInputStart(e, this._getInputCoords(e));
			}, this)
		);

		this.dom.$canvas.on(
			'mousemove touchmove',
			$.proxy(function(e) {
				this._onInputMove(e, this._getInputCoords(e));
			}, this)
		);

		this.dom.$canvas.on('mousemove', $.proxy(function() {}, this));

		this.dom.$canvas.on(
			'mouseup touchend',
			$.proxy(function(e) {
				this._onInputStop(e, this._getInputCoords(e));
			}, this)
		);

		this.dom.$canvas.on(
			'mouseover',
			$.proxy(function(e) {
				this._onMouseOver(e, this._getInputCoords(e));
			}, this)
		);

		this.dom.$canvas.on(
			'mouseout',
			$.proxy(function(e) {
				this._onMouseOut(e, this._getInputCoords(e));
			}, this)
		);

		$('body').on(
			'mouseup touchend',
			$.proxy(function() {
				this.isDrawing = false;
			}, this)
		);

		if (window.requestAnimationFrame) requestAnimationFrame($.proxy(this.draw, this));
	},

	draw() {
		// if the pencil size is big (>10), the small crosshair makes a friend: a circle of the size of the pencil
		// todo: have the circle works on every browser - it currently should be added only when CSS pointer-events are supported
		// we assume that if requestAnimationFrame is supported, pointer-events is too, but this is terribad.
		if (window.requestAnimationFrame && this.ctx.lineWidth > 10 && this.isMouseHovering) {
			this.dom.$cursor.css({
				width: `${this.ctx.lineWidth}px`,
				height: `${this.ctx.lineWidth}px`
			});
			const transform = DrawingBoard.Utils.tpl('translateX({{x}}px) translateY({{y}}px)', {
				x: this.coords.current.x - this.ctx.lineWidth / 2,
				y: this.coords.current.y - this.ctx.lineWidth / 2
			});
			this.dom.$cursor.css({
				transform,
				'-webkit-transform': transform,
				'-ms-transform': transform
			});
			this.dom.$cursor.removeClass('drawing-board-utils-hidden');
		} else {
			this.dom.$cursor.addClass('drawing-board-utils-hidden');
		}

		if (this.isDrawing) {
			const currentMid = this._getMidInputCoords(this.coords.current);
			this.ctx.beginPath();
			this.ctx.moveTo(currentMid.x, currentMid.y);
			this.ctx.quadraticCurveTo(
				this.coords.old.x,
				this.coords.old.y,
				this.coords.oldMid.x,
				this.coords.oldMid.y
			);
			this.ctx.stroke();

			this.coords.old = this.coords.current;
			this.coords.oldMid = currentMid;
		}

		if (window.requestAnimationFrame)
			requestAnimationFrame(
				$.proxy(function() {
					this.draw();
				}, this)
			);
	},

	_onInputStart(e, coords) {
		this.coords.current = this.coords.old = coords;
		this.coords.oldMid = this._getMidInputCoords(coords);
		this.isDrawing = true;

		if (!window.requestAnimationFrame) this.draw();

		this.ev.trigger('board:startDrawing', {
			e,
			coords
		});
		e.stopPropagation();
		e.preventDefault();
	},

	_onInputMove(e, coords) {
		this.coords.current = coords;
		this.ev.trigger('board:drawing', {
			e,
			coords
		});

		if (!window.requestAnimationFrame) this.draw();

		e.stopPropagation();
		e.preventDefault();
	},

	_onInputStop(e, coords) {
		if (this.isDrawing && (!e.touches || e.touches.length === 0)) {
			this.isDrawing = false;

			this.saveWebStorage();
			this.saveHistory();

			this.ev.trigger('board:stopDrawing', {
				e,
				coords
			});
			this.ev.trigger('board:userAction');
			e.stopPropagation();
			e.preventDefault();
		}
	},

	_onMouseOver(e, coords) {
		this.isMouseHovering = true;
		this.coords.old = this._getInputCoords(e);
		this.coords.oldMid = this._getMidInputCoords(this.coords.old);

		this.ev.trigger('board:mouseOver', {
			e,
			coords
		});
	},

	_onMouseOut(e, coords) {
		this.isMouseHovering = false;

		this.ev.trigger('board:mouseOut', {
			e,
			coords
		});
	},

	_getInputCoords(e) {
		e = e.originalEvent ? e.originalEvent : e;
		const rect = this.canvas.getBoundingClientRect();
		const width = this.dom.$canvas.width();
		const height = this.dom.$canvas.height();
		let x;
		let y;
		if (e.touches && e.touches.length == 1) {
			x = e.touches[0].pageX;
			y = e.touches[0].pageY;
		} else {
			x = e.pageX;
			y = e.pageY;
		}
		x -= this.dom.$canvas.offset().left;
		y -= this.dom.$canvas.offset().top;
		x *= width / rect.width;
		y *= height / rect.height;
		return {
			x,
			y
		};
	},

	_getMidInputCoords(coords) {
		return {
			x: (this.coords.old.x + coords.x) >> 1,
			y: (this.coords.old.y + coords.y) >> 1
		};
	}
};

DrawingBoard.Control = function(drawingBoard, opts) {
	this.board = drawingBoard;
	this.opts = $.extend({}, this.defaults, opts);

	this.$el = $(document.createElement('div')).addClass('drawing-board-control');
	if (this.name) this.$el.addClass(`drawing-board-control-${this.name}`);

	this.board.ev.bind('board:reset', $.proxy(this.onBoardReset, this));

	this.initialize.apply(this, arguments);
	return this;
};

DrawingBoard.Control.prototype = {
	name: '',

	defaults: {},

	initialize() {},

	addToBoard() {
		this.board.addControl(this);
	},

	onBoardReset() {}
};

// extend directly taken from backbone.js
DrawingBoard.Control.extend = function(protoProps, staticProps) {
	const parent = this;
	let child;
	if (protoProps && protoProps.hasOwnProperty('constructor')) {
		child = protoProps.constructor;
	} else {
		child = function() {
			return parent.apply(this, arguments);
		};
	}
	$.extend(child, parent, staticProps);
	const Surrogate = function() {
		this.constructor = child;
	};
	Surrogate.prototype = parent.prototype;
	child.prototype = new Surrogate();
	if (protoProps) $.extend(child.prototype, protoProps);
	child.__super__ = parent.prototype;
	return child;
};
DrawingBoard.Control.Color = DrawingBoard.Control.extend({
	name: 'colors',

	initialize() {
		this.initTemplate();

		const that = this;
		this.$el.on('click', '.drawing-board-control-colors-picker', function(e) {
			const color = $(this).attr('data-color');
			that.board.setColor(color);
			that.$el
				.find('.drawing-board-control-colors-current')
				.css('background-color', color)
				.attr('data-color', color);

			that.board.ev.trigger('color:changed', color);
			that.$el
				.find('.drawing-board-control-colors-rainbows')
				.addClass('drawing-board-utils-hidden');

			e.preventDefault();
		});

		this.$el.on('click', '.drawing-board-control-colors-current', function(e) {
			that.$el
				.find('.drawing-board-control-colors-rainbows')
				.toggleClass('drawing-board-utils-hidden');
			e.preventDefault();
		});

		$('body').on('click', function(e) {
			const $target = $(e.target);
			const $relatedButton = $target.hasClass('drawing-board-control-colors-current')
				? $target
				: $target.closest('.drawing-board-control-colors-current');
			const $myButton = that.$el.find('.drawing-board-control-colors-current');
			const $popup = that.$el.find('.drawing-board-control-colors-rainbows');
			if (
				(!$relatedButton.length || $relatedButton.get(0) !== $myButton.get(0)) &&
				!$popup.hasClass('drawing-board-utils-hidden')
			)
				$popup.addClass('drawing-board-utils-hidden');
		});
	},

	initTemplate() {
		const tpl =
			'<div class="drawing-board-control-inner">' +
			'<div class="drawing-board-control-colors-current" style="background-color: {{color}}" data-color="{{color}}"></div>' +
			'<div class="drawing-board-control-colors-rainbows">{{rainbows}}</div>' +
			'</div>';
		const oneColorTpl =
			'<div class="drawing-board-control-colors-picker" data-color="{{color}}" style="background-color: {{color}}"></div>';
		let rainbows = '';
		$.each(
			[0.75, 0.5, 0.25],
			$.proxy(function(key, val) {
				let i = 0;
				let additionalColor = null;
				rainbows += '<div class="drawing-board-control-colors-rainbow">';
				if (val == 0.25) additionalColor = this._rgba(0, 0, 0, 1);
				if (val == 0.5) additionalColor = this._rgba(150, 150, 150, 1);
				if (val == 0.75) additionalColor = this._rgba(255, 255, 255, 1);
				rainbows += DrawingBoard.Utils.tpl(oneColorTpl, {
					color: additionalColor.toString()
				});
				while (i <= 330) {
					rainbows += DrawingBoard.Utils.tpl(oneColorTpl, {
						color: this._hsl2Rgba(this._hsl(i - 60, 1, val)).toString()
					});
					i += 30;
				}
				rainbows += '</div>';
			}, this)
		);

		this.$el.append(
			$(
				DrawingBoard.Utils.tpl(tpl, {
					color: this.board.color,
					rainbows
				})
			)
		);
		this.$el.find('.drawing-board-control-colors-rainbows').addClass('drawing-board-utils-hidden');
	},

	onBoardReset() {
		this.board.setColor(this.$el.find('.drawing-board-control-colors-current').attr('data-color'));
	},

	_rgba(r, g, b, a) {
		return {
			r,
			g,
			b,
			a,
			toString() {
				return `rgba(${r}, ${g}, ${b}, ${a})`;
			}
		};
	},

	_hsl(h, s, l) {
		return {
			h,
			s,
			l,
			toString() {
				return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
			}
		};
	},

	_hex2Rgba(hex) {
		const num = parseInt(hex.substring(1), 16);
		return this._rgba(num >> 16, (num >> 8) & 255, num & 255, 1);
	},

	// conversion function (modified a bit) taken from http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
	_hsl2Rgba(hsl) {
		const h = hsl.h / 360;
		const { s } = hsl;
		const { l } = hsl;
		let r;
		let g;
		let b;

		function hue2rgb(p, q, t) {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}
		if (s === 0) {
			r = g = b = l; // achromatic
		} else {
			const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			const p = 2 * l - q;
			r = Math.floor(hue2rgb(p, q, h + 1 / 3) * 255);
			g = Math.floor(hue2rgb(p, q, h) * 255);
			b = Math.floor(hue2rgb(p, q, h - 1 / 3) * 255);
		}
		return this._rgba(r, g, b, 1);
	}
});
DrawingBoard.Control.DrawingMode = DrawingBoard.Control.extend({
	name: 'drawingmode',

	defaults: {
		pencil: true,
		eraser: true,
		filler: true
	},

	initialize() {
		this.prevMode = this.board.getMode();

		$.each(
			['pencil', 'eraser', 'filler'],
			$.proxy(function(k, value) {
				if (this.opts[value]) {
					this.$el.append(
						`<button class="drawing-board-control-drawingmode-${value}-button" data-mode="${value}"></button>`
					);
				}
			}, this)
		);

		this.$el.on(
			'click',
			'button[data-mode]',
			$.proxy(function(e) {
				const value = $(e.currentTarget).attr('data-mode');
				const mode = this.board.getMode();
				if (mode !== value) this.prevMode = mode;
				const newMode = mode === value ? this.prevMode : value;
				this.board.setMode(newMode);
				e.preventDefault();
			}, this)
		);

		this.board.ev.bind(
			'board:mode',
			$.proxy(function(mode) {
				this.toggleButtons(mode);
			}, this)
		);

		this.toggleButtons(this.board.getMode());
	},

	toggleButtons(mode) {
		this.$el.find('button[data-mode]').each(function(k, item) {
			const $item = $(item);
			$item.toggleClass('active', mode === $item.attr('data-mode'));
		});
	}
});

DrawingBoard.Control.Navigation = DrawingBoard.Control.extend({
	name: 'navigation',

	defaults: {
		back: true,
		forward: true,
		reset: true
	},

	initialize() {
		let el = '';
		if (this.opts.back)
			el += '<button class="drawing-board-control-navigation-back">&larr;</button>';
		if (this.opts.forward)
			el += '<button class="drawing-board-control-navigation-forward">&rarr;</button>';
		if (this.opts.reset)
			el += '<button class="drawing-board-control-navigation-reset">&times;</button>';
		this.$el.append(el);

		if (this.opts.back) {
			const $back = this.$el.find('.drawing-board-control-navigation-back');
			this.board.ev.bind('historyNavigation', $.proxy(this.updateBack, this, $back));
			this.$el.on(
				'click',
				'.drawing-board-control-navigation-back',
				$.proxy(function(e) {
					this.board.goBackInHistory();
					e.preventDefault();
				}, this)
			);

			this.updateBack($back);
		}

		if (this.opts.forward) {
			const $forward = this.$el.find('.drawing-board-control-navigation-forward');
			this.board.ev.bind('historyNavigation', $.proxy(this.updateForward, this, $forward));
			this.$el.on(
				'click',
				'.drawing-board-control-navigation-forward',
				$.proxy(function(e) {
					this.board.goForthInHistory();
					e.preventDefault();
				}, this)
			);

			this.updateForward($forward);
		}

		if (this.opts.reset) {
			this.$el.on(
				'click',
				'.drawing-board-control-navigation-reset',
				$.proxy(function(e) {
					this.board.reset({
						background: true
					});
					e.preventDefault();
				}, this)
			);
		}
	},

	updateBack($back) {
		if (this.board.history.canUndo()) {
			$back.removeAttr('disabled');
		} else {
			$back.attr('disabled', 'disabled');
		}
	},

	updateForward($forward) {
		if (this.board.history.canRedo()) {
			$forward.removeAttr('disabled');
		} else {
			$forward.attr('disabled', 'disabled');
		}
	}
});
DrawingBoard.Control.Size = DrawingBoard.Control.extend({
	name: 'size',

	defaults: {
		type: 'auto',
		dropdownValues: [1, 3, 6, 10, 20, 30, 40, 50],
		min: 1,
		max: 50
	},

	types: ['dropdown', 'range'],

	initialize() {
		if (this.opts.type == 'auto') this.opts.type = this._iHasRangeInput() ? 'range' : 'dropdown';
		const tpl =
			$.inArray(this.opts.type, this.types) > -1 ? this[`_${this.opts.type}Template`]() : false;
		if (!tpl) return false;

		this.val = this.board.opts.size;

		this.$el.append($(tpl));
		this.$el.attr('data-drawing-board-type', this.opts.type);
		this.updateView();

		const that = this;

		if (this.opts.type == 'range') {
			this.$el.on('change', '.drawing-board-control-size-range-input', function(e) {
				that.val = $(this).val();
				that.updateView();

				that.board.ev.trigger('size:changed', that.val);

				e.preventDefault();
			});
		}

		if (this.opts.type == 'dropdown') {
			this.$el.on(
				'click',
				'.drawing-board-control-size-dropdown-current',
				$.proxy(function() {
					this.$el
						.find('.drawing-board-control-size-dropdown')
						.toggleClass('drawing-board-utils-hidden');
				}, this)
			);

			this.$el.on('click', '[data-size]', function(e) {
				that.val = parseInt($(this).attr('data-size'), 0);
				that.updateView();

				that.board.ev.trigger('size:changed', that.val);

				e.preventDefault();
			});
		}
	},

	_rangeTemplate() {
		const tpl =
			'<div class="drawing-board-control-inner" title="{{size}}">' +
			'<input type="range" min="{{min}}" max="{{max}}" value="{{size}}" step="1" class="drawing-board-control-size-range-input">' +
			'<span class="drawing-board-control-size-range-current"></span>' +
			'</div>';
		return DrawingBoard.Utils.tpl(tpl, {
			min: this.opts.min,
			max: this.opts.max,
			size: this.board.opts.size
		});
	},

	_dropdownTemplate() {
		let tpl =
			'<div class="drawing-board-control-inner" title="{{size}}">' +
			'<div class="drawing-board-control-size-dropdown-current"><span></span></div>' +
			'<ul class="drawing-board-control-size-dropdown">';
		$.each(this.opts.dropdownValues, function(i, size) {
			tpl += DrawingBoard.Utils.tpl(
				'<li data-size="{{size}}"><span style="width: {{size}}px; height: {{size}}px; border-radius: {{size}}px;"></span></li>',
				{
					size
				}
			);
		});
		tpl += '</ul></div>';
		return tpl;
	},

	onBoardReset() {
		this.updateView();
	},

	updateView() {
		const { val } = this;
		this.board.ctx.lineWidth = val;

		this.$el
			.find(
				'.drawing-board-control-size-range-current, .drawing-board-control-size-dropdown-current span'
			)
			.css({
				width: `${val}px`,
				height: `${val}px`,
				borderRadius: `${val}px`,
				marginLeft: `${(-1 * val) / 2}px`,
				marginTop: `${(-1 * val) / 2}px`
			});

		this.$el.find('.drawing-board-control-inner').attr('title', val);

		if (this.opts.type == 'dropdown') {
			let closest = null;
			$.each(this.opts.dropdownValues, function(i, size) {
				if (closest === null || Math.abs(size - val) < Math.abs(closest - val)) closest = size;
			});
			this.$el.find('.drawing-board-control-size-dropdown').addClass('drawing-board-utils-hidden');
		}
	},

	_iHasRangeInput() {
		const inputElem = document.createElement('input');
		const smile = ':)';
		const docElement = document.documentElement;
		const inputElemType = 'range';
		let available;
		inputElem.setAttribute('type', inputElemType);
		available = inputElem.type !== 'text';
		inputElem.value = smile;
		inputElem.style.cssText = 'position:absolute;visibility:hidden;';
		if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {
			docElement.appendChild(inputElem);
			const { defaultView } = document;
			available =
				defaultView.getComputedStyle &&
				defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
				inputElem.offsetHeight !== 0;
			docElement.removeChild(inputElem);
		}
		return !!available;
	}
});
DrawingBoard.Control.Download = DrawingBoard.Control.extend({
	name: 'download',

	initialize() {
		this.$el.append('<button class="drawing-board-control-download-button"></button>');
		this.$el.on(
			'click',
			'.drawing-board-control-download-button',
			$.proxy(function(e) {
				this.board.downloadImg();
				e.preventDefault();
			}, this)
		);
	}
});
