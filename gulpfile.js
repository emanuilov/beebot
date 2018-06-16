var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var jasmine = require('gulp-jasmine-browser');
var clean = require('gulp-clean');
var child_process = require('child_process');
var nwjs = false;

gulp.task('watch', function () {
	gulp.watch('./src/sass/**/*.scss', gulp.parallel('styles'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('lint', 'scripts'));
	gulp.watch('./src/img/*', gulp.parallel('minify-images', 'restart-nwjs'));
	gulp.watch('./src/**/*.html', gulp.series('copy-html', 'restart-nwjs'));
});

gulp.task('copy-html', function () {
	return gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('styles', function () {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 5 versions']
		}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function () {
	return gulp.src('./src/js/**/*.js')
		.pipe(babel())
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-dist', function () {
	return gulp.src(['./src/js/**/*.js', '!./src/js/dev-reload.js'])
		.pipe(babel())
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('minify-images', function () {
	return gulp.src('./src/img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('lint', function () {
	return gulp.src(['./src/js/**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('tests', function () {
	return gulp.src(['./src/**/*.js'])
		.pipe(jasmine.specRunner({
			console: true
		}))
		.pipe(jasmine.headless({
			driver: 'chrome'
		}));
});

gulp.task('clean', function () {
	return gulp.src('./dist', {
		read: false
	}).pipe(clean());
});

gulp.task('restart-nwjs', function () {
	/*eslint no-console: ["error", { allow: ["error"] }] */
	if (nwjs) {
		var kill_command;
		if (process.platform == 'win32') {
			kill_command = 'taskkill /F /IM nw.exe';
		} else {
			kill_command = 'killall -KILL nw';
		}
		child_process.exec(kill_command, function (err) {
			if (err != null && !err.killed)
				console.error(err);
		});
	}
	nwjs = child_process.exec('nw .', function (err) {
		if (err != null && !err.killed)
			console.error(err);
	});
	return gulp.src('./');
});

gulp.task('default', gulp.series('clean', gulp.parallel('copy-html', 'styles', 'lint', 'scripts', 'minify-images'), 'restart-nwjs', 'watch'));
gulp.task('export', gulp.series('clean', gulp.parallel('copy-html', 'styles', 'lint', 'scripts-dist', 'minify-images')));