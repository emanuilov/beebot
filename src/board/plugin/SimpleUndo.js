export default class SimpleUndo {
	constructor(options) {
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
	}

	truncate(stack, limit) {
		while (stack.length > limit) {
			stack.shift();
		}
	}

	initialize(initialItem) {
		this.stack[0] = initialItem;
		this.initialItem = initialItem;
	}

	clear() {
		this.stack = [this.initialItem];
		this.position = 0;
		this.onUpdate();
	}

	/*	save() {
		this.provider(
			(current) => {
				this.truncate(this.stack, this.maxLength);
				this.position = Math.min(this.position, this.stack.length - 1);

				this.stack = this.stack.slice(0, this.position + 1);
				this.stack.push(current);
				this.position++;
				this.onUpdate();
			}.bind(this)
		);
	} */

	undo(callaback) {
		if (this.canUndo()) {
			const item = this.stack[--this.position];
			this.onUpdate();

			if (callback) {
				callback(item);
			}
		}
	}

	redo(callaback) {
		if (this.canRedo()) {
			const item = this.stack[++this.position];
			this.onUpdate();

			if (callback) {
				callback(item);
			}
		}
	}

	canUndo() {
		return this.position > 0;
	}

	canRedo() {
		return this.position < this.count();
	}

	count() {
		return this.stack.length - 1; // -1 because of initial item
	}
}
