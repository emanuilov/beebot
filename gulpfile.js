/*eslint no-console: ["error", { allow: ["log","warn","error"] }] */
const gulp = require('gulp'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	eslint = require('gulp-eslint'),
	babel = require('gulp-babel'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	jasmine = require('gulp-jasmine-browser'),
	clean = require('gulp-clean'),
	child_process = require('child_process');
let nwjs = false;

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
		.pipe(eslint({
			'configFile': './.eslintrc.json'
		}))
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
	if (nwjs) {
		let kill_command;
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

gulp.task('build-info-message', function () {
	console.log('Execute the following command to build the project nwbuild . -p win32,win64,osx32,osx64,linux32,linux64 --flavor normal');
	console.log(`The project will be build in ${process.cwd()}/build`);
	return gulp.src('./');
});

gulp.task('default', gulp.series('clean', gulp.parallel('copy-html', 'styles', 'lint', 'scripts', 'minify-images'), 'restart-nwjs', 'watch'));
gulp.task('export', gulp.series('clean', gulp.parallel('copy-html', 'styles', 'lint', 'scripts-dist', 'minify-images'), 'build-info-message'));