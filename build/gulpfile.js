var gulp = require('gulp');
var livereload = require('gulp-livereload');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('jshint', function() {
    return gulp
        .src('scripts/mdSkew.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('uglify', ['jshint'], function() {
    return gulp
        .src([
            'scripts/mdSkew.js',
        ])
        .pipe(concat('mdSkew.min.js'))
        .pipe(uglify({comments:'all'}))
        .pipe(gulp.dest('../dist'))
        .pipe(livereload());
});

gulp.task('copy', function () {
    return gulp
        .src('scripts/mdSkew.js')
        .pipe(gulp.dest('../dist'));
});

gulp.task('js', ['jshint', 'uglify', 'copy']);


gulp.task('watch', function() {

    gulp.watch('scripts/mdSkew.js', ['js']);

    livereload.listen();
});

gulp.task('default', ['js', 'watch']);