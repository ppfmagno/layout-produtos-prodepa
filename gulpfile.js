const gulp = require('gulp');
const ejs = require('gulp-ejs');
const flatmap = require('gulp-flatmap');

function templates() {
    let title;
    return gulp.src('src/templates/*.ejs')
        .pipe(flatmap((stream, file) => {
            title = file.path.replace( /^.*\/(\w+)\..*$/, "$1" );
            return stream.pipe(ejs({title:title}, {}, { ext: '.html' }));
        }))
        .pipe(gulp.dest('./dist'));
}

function watch() {
    gulp.watch('src/templates/**/*.ejs', templates);
}

exports.templates = templates;
exports.watch = watch;

const build = gulp.series(gulp.parallel(templates));

gulp.task('build', build);

gulp.task('default', build);