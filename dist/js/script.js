'use strict';

var gulp = require('gulp');
gulp.task('nw-reload', function () {
	window.location.reload();
});

gulp.watch('./dist/**/*', gulp.parallel('nw-reload'));
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
	'h1',
	null,
	' Hello, test! '
), document.getElementById('root'));