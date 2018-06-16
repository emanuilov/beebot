var gulp = require('gulp');
gulp.task('nw-reload', function () {
	location.reload();
});

gulp.watch('./dist/**/*', gulp.parallel('nw-reload'));
