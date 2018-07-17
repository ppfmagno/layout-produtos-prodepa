const gulp = require('gulp');
const browserSync = require('browser-sync');
const ejs = require('gulp-ejs');
const flatmap = require('gulp-flatmap');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

const paths = {
    templates: {
        src: 'src/templates/*.ejs',
        dest: './dist'
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
        .pipe(gulp.dest(paths.templates.dest));
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(paths.templates.src)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

exports.templates = templates;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.serve = serve;

const build = gulp.series(gulp.parallel(templates, styles));

gulp.task('build', build);

gulp.task('default', serve);