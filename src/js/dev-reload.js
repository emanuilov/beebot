var gulp = require('gulp');
gulp.task('nw-reload', function () {
	window.location.reload();
});

gulp.watch('./dist/**/*', gulp.parallel('nw-reload'));