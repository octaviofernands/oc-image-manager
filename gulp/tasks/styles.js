var gulp         = require('gulp');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS    = require('gulp-minify-css');
var handleErrors = require('../util/handleErrors');
var styles       = require('../config').styles;

gulp.task('styles', function() {

  return gulp.src(styles.less.src)
    .pipe(less(styles.less.config))
    .on('error', handleErrors)
    .pipe(autoprefixer(styles.prefix))
    .pipe(minifyCSS(styles.minify))
    .pipe(gulp.dest(styles.dest));

});
