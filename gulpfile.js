const { src, dest, watch, parallel,} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require ('gulp-cssnano');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');

// HTML
function htmlTask() {
    return src('app/*.html')
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// SCSS
function scssTask() {
    return src('app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename('index.min.css'))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// JS
function jsTask() {
    return src('app/js/**/*.js')
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
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
    watch('app/components/**/*.html', htmlTask).on('change', browserSync.reload);
    watch('app/scss/*.scss', scssTask);
    watch('app/components/**/*.scss', scssTask);
    watch('app/js/**/*.js', jsTask).on('change', browserSync.reload);
    watch('app/img/**/*', imgTask).on('change', browserSync.reload);
}

exports.default = parallel(htmlTask, scssTask, jsTask, imgTask, serve);