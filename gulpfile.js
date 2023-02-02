const gulp = require('gulp');

const plumber = require("gulp-plumber");

const sass = require('gulp-sass');
const cssmin = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const concat = require('gulp-concat');
const rename = require('gulp-rename');

const jsmin = require('gulp-uglify');

const imagemin = require("gulp-imagemin");

const webp = require("gulp-webp");

const del = require('del');

const browserSync = require('browser-sync').create();

const cache = require('gulp-cache');

function clean () {
	return del(["dist/*"]);
}

function copy () {
	return gulp.src([
		"src/fonts/**/*.{ttf,woff,woff2}",
		"src/img/**/*.{gif,ico}",
		"src/svg/**/*.svg",
		"src/libs/**/*"
	], {
		base: "src"
	})
	.pipe(gulp.dest("dist"));
}

function styles() {
	return gulp.src('src/scss/main.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(concat('style.css'))
	.pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulp.dest("dist/css"))
  .pipe(cssmin({
  	level: 2
  }))
  .pipe(rename({
  	suffix: '.min'
  }))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({ stream: true }));
}


function scripts() {
	return gulp.src('src/js/**/*.js')
	.pipe(concat('main.js'))
	.pipe(gulp.dest('dist/js'))
	.pipe(jsmin({
		toplevel: false
	}))
  .pipe(rename({
  	suffix: '.min'
  }))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({ stream: true }));
}

function images () {
  return gulp.src("src/img/**/*.{png,jpg,jpeg}")
  .pipe(cache(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true})
  ])))
  .pipe(gulp.dest("dist/img"));
}

function webpfun () {
	return gulp.src("dist/img/**/*.{png,jpg,jpeg}")
	.pipe(webp())
	.pipe(gulp.dest("dist/img"));
}

function html () {
	return gulp.src("src/*.html")
	.pipe(gulp.dest("dist"));
}

function clear() {
  return cache.clearAll();
}

function watch() {
	browserSync.init({
    server: {
      baseDir: "dist/",
      index: "index.html",
      ghostMode: false,
      port: 3000,
      notify: true
    }
  });

  gulp.watch('src/scss/**/*.scss', styles);
  gulp.watch('src/js/**/*.js', scripts);
	gulp.watch("src/fonts/*", copy)
	gulp.watch("src/libs/**/*", copy)
	// gulp.watch("source/img/**/*.{png,jpg,jpeg}", gulp.series(images, webpfun))
	gulp.watch("src/img/**/*.{png,jpg,jpeg}", images)
	gulp.watch("src/img/**/*.{svg,gif}", copy)
  gulp.watch("src/*.html").on('change', gulp.parallel(html,browserSync.reload));
}

gulp.task("clean", clean);
gulp.task("copy", copy);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task("images", images);
gulp.task("webp", webpfun);
gulp.task("html", html);
gulp.task('clear', clear);
gulp.task('watch', watch);


// gulp.task("build", gulp.series(clean, copy, gulp.parallel(styles, scripts), images, webpfun, html));
gulp.task("build", gulp.series(clean, copy, gulp.parallel(styles, scripts), images, html));
gulp.task('dev', gulp.series('build','watch'));