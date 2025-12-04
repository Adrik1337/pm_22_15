const { src, dest, watch, series } = require('gulp');
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
        watch: 'app/**/*.html'
    },
    styles: {
        src: 'app/scss/style.scss',
        dest: 'dist/css',
        watch: 'app/scss/**/*.scss'
    },
    images: {
        src: 'app/img/**/*',
        dest: 'dist/img',
        watch: 'app/img/**/*'
    },
    scripts: {
        src: 'app/js/**/*.js',
        dest: 'dist/js',
        watch: 'app/js/**/*.js'
    },
    bootstrap: {
        css: 'node_modules/bootstrap/dist/css/bootstrap.min.css',
        js: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    },
    json: {
        src: 'app/data.json',
        dest: 'dist',
        watch: 'app/data.json'
    }
};

const bootstrapCSS = () =>  {
    return src(paths.bootstrap.css)
        .pipe(dest(paths.styles.dest));
}

const bootstrapJS = () =>  {
    return src(paths.bootstrap.js)
        .pipe(dest(paths.scripts.dest));
}

const htmlTask = () =>  {
    return src(paths.html.src)
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest(paths.html.dest))
        .pipe(browserSync.stream());
}

const scssTask = () => {
    return src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename('index.min.css'))
        .pipe(dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

const imgTask = () =>  {
    return src(paths.images.src, { encoding: false })
        .pipe(imagemin())
        .pipe(dest(paths.images.dest))
        .pipe(browserSync.stream());
}

const jsTask = () =>  {
    return src(paths.scripts.src)
        .pipe(dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

const jsonTask = () => {
    return src(paths.json.src)
        .pipe(dest(paths.json.dest))
        .pipe(browserSync.stream());
}

const reload = (done) => {
    browserSync.reload();
    done();
}

const serve = (done) =>  {
    browserSync.init({
        server: { baseDir: 'dist' }
    });
    done();
}

const watcher = () => {
    watch(paths.html.watch, series(htmlTask, reload));
    watch(paths.styles.watch, series(scssTask, reload));
    watch(paths.images.watch, series(imgTask, reload));
    watch(paths.scripts.watch, series(jsTask, reload));
    watch(paths.json.watch, series(jsonTask, reload));
}

const build = series( bootstrapCSS, bootstrapJS, htmlTask, scssTask, jsTask, imgTask, jsonTask );

exports.default = series( build, serve, watcher );