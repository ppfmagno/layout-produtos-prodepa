const gulp = require('gulp');
const browserSync = require('browser-sync');
const ejs = require('gulp-ejs');
const flatmap = require('gulp-flatmap');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const paths = {
    templates: {
        src: ['src/templates/**/*.ejs', '!src/templates/partials/**/*.ejs'],
        dest: './dist'
    },
    images: {
        src: ['src/img/**/*', '!src/img/raw/**/*'],
        dest: 'dist/img'
    },
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css',
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
}

function serve() {
    browserSync.init({
        server: './dist'
    });
    watch();
    gulp.watch('./dist/*.html').on('change', browserSync.reload);
}

function templates() {
    let title;
    return gulp.src(paths.templates.src)
        .pipe(flatmap((stream, file) => {
            title = file.path.replace( /^.*\/(\w+)\..*$/, "$1" );
            return stream.pipe(ejs({title:title}, {}, { ext: '.html' }));
        }))
        .pipe(gulp.dest(paths.templates.dest))
        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
    }
    
    function scripts() {
        return gulp.src(paths.scripts.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

function watch() {
    gulp.watch(paths.templates.src[0], templates);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

exports.templates = templates;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.serve = serve;

const build = gulp.series(gulp.parallel(templates, images, styles, scripts));

gulp.task('build', build);

gulp.task('default', serve);