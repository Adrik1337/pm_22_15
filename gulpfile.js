<<<<<<< HEAD
const { src, dest, watch, series, parallel } = require('gulp');
=======
const { src, dest, watch, parallel,} = require('gulp');
>>>>>>> 576197f8f2b655cbf613c40dce67735800590f69
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');

<<<<<<< HEAD
const paths = {
    html: {
        src: 'app/*.html',
        dest: 'dist',
        },
    styles: {
        src: 'app/scss/style.scss',
        dest: 'dist/css',
    },
    scripts: {
        src: 'app/js/**/*.js',
        dest: 'dist/js',
    },
    images: {
        src: 'app/img/**/*',
        dest: 'dist/img',
    },
        bootstrap: {
        css: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
        js: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    }
};


const bootstrapCSS = (done) =>  {
    return src(paths.bootstrap.css)
        .pipe(dest(paths.styles.dest));
}

const bootstrapJS = (done) =>  {
    return src(paths.bootstrap.js)
        .pipe(dest(paths.scripts.dest));
}

const htmlTask = (done) =>  {
    return src(paths.html.src)
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
}

const scssTask = (done) =>  {
    return src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename('index.min.css'))
        .pipe(dest(paths.styles.dest))
=======
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
>>>>>>> 576197f8f2b655cbf613c40dce67735800590f69
        .pipe(browserSync.stream());
}

const jsTask = (done) =>  {
    return src(paths.scripts.src)
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

const imgTask = (done) =>  {
    return src(paths.images.src, { encoding: false })
        .pipe(imagemin())
<<<<<<< HEAD
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.stream());
}


const serve = (done) =>  {
    browserSync.init({
        server: { baseDir: 'dist' }
    });
}

const watcher = (done) => {
    watch(paths.html.watch, htmlTask);
    watch(paths.styles.watch, scssTask);
    watch(paths.scripts.watch, jsTask);
    watch(paths.images.watch, imgTask);
}


const build = series(
    bootstrapCSS, 
    bootstrapJS, 
    htmlTask, 
    scssTask, 
    jsTask, 
    imgTask
);

exports.default = series(build, serve, watcher);
=======
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
>>>>>>> 576197f8f2b655cbf613c40dce67735800590f69
