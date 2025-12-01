const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');

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