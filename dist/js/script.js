'use strict';

var gulp = require('gulp');
gulp.task('nw-reload', function () {
	window.location.reload();
});

gulp.watch('./dist/**/*', gulp.parallel('nw-reload'));
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeScreen = function () {
	function HomeScreen() {
		_classCallCheck(this, HomeScreen);

		this.header();
		this.footer();
	}

	_createClass(HomeScreen, [{
		key: 'header',
		value: function header() {
			_reactDom2.default.render(_react2.default.createElement(
				'header',
				null,
				'Test'
			), document.getElementById('container'));
		}
	}, {
		key: 'footer',
		value: function footer() {
			_reactDom2.default.render(_react2.default.createElement(
				'footer',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'left' },
					'\u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442 \u043D\u0430 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435\u0442\u043E \u043F\u043E \u043F\u044A\u0442\u0438\u0449\u0430\u0442\u0430 \xA9 \u0418\u043D\u043E\u0432\u0430\u0446\u0438\u0438 \u0438 \u041A\u043E\u043D\u0441\u0443\u043B\u0442\u0438\u0440\u0430\u043D\u0435'
				),
				_react2.default.createElement(
					'div',
					{ className: 'right' },
					'\u0417\u0430 \u0438\u0433\u0440\u0430\u0442\u0430 \u2022 \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0438 \u2022 \u041F\u043E\u0432\u0435\u0440\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442 \u0438 \u0443\u0441\u043B\u043E\u0432\u0438\u044F'
				)
			), document.getElementById('container'));
		}
	}]);

	return HomeScreen;
}();

new HomeScreen();