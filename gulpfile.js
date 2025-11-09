const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require ('gulp-cssnano');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

// HTML
function htmlTask() {
    return src('app/html/**/*.html')
        .pipe(dest('dist/html'));
}

function indexTask() {
    return src('app/index.html')
        .pipe(dest('dist'));
}

// SCSS
function scssTask() {
    return src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// JS
function jsTask() {
    return src('app/js/**/*.js')
        .pipe(dest('dist/js'));
}

// Images
function imgTask() {
    return src('app/img/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(dest('dist/img'));
}
// Reloading
function serve() {
    browserSync.init( { server: { baseDir: 'dist' } });
    watch('app/html/**/*.html', htmlTask).on('change', browserSync.reload);
    watch('app/scss/**/*.scss', scssTask).on('change', browserSync.reload);
    watch('app/js/**/*.js', jsTask).on('change', browserSync.reload);
    watch('app/img/**/*', imgTask).on('change', browserSync.reload);
    watch('app/index.html', indexTask).on('change', browserSync.reload);
}

exports.default = parallel(htmlTask, indexTask, scssTask, jsTask, imgTask, serve);