export default class Utils {
	constructor() {}

	tpl() {
		const start = '{{';
		const end = '}}';
		const pathRegEXP = '[a-z0-9_][\\.a-z0-9_]*'; // e.g. config.person.name
		const pattern = new RegExp(`${start}\\s*(${pathRegEXP})\\s*${end}`, 'gi');
		let undef;

		return (template, data) => {
			// Merge data into the template string
			return template.replace(pattern, (tag, token) => {
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
				return 0;
			});
		};
	}
}
