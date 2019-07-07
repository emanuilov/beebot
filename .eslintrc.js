module.exports = {
	"extends": [
		"airbnb",
		"prettier",
		"prettier/react"
	],
	"plugins": [
		"eslint-plugin-prettier"
	],
	"parser": "babel-eslint",
	"env": {
		"browser": true,
		"jest": true,
		"es6": true
	},
	"rules": {
		"jsx-a11y/no-noninteractive-element-to-interactive-role": 0,
		"linebreak-style": 0,
		"class-methods-use-this": 0,
		"import/no-named-as-default": 0,
		"react/jsx-curly-brace-presence": [
			2,
			{
				"props": "always"
			}
		],
		"react/display-name": 0,
		"react/prefer-stateless-function": [
			"error",
			{
				"ignorePureComponents": true
			}
		],
		"react/jsx-filename-extension": [
			"error",
			{
				"extensions": [
					".js",
					".jsx"
				]
			}
		],
		"jsx-a11y/click-events-have-key-events": 0,
		"react/destructuring-assignment": 0,
		"prettier/prettier": [
			"error",
			{
				"useTabs": true,
				"trailingComma": "none",
				"singleQuote": true,
				"printWidth": 100
			}
		]
	},
	"globals": {
		"$": true,
		"nw": true
	}
};