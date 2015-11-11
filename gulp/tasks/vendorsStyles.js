var gulp       = require('gulp');
var path       = require('path');
var concat     = require('gulp-concat');
var vendors    = require('../config').vendorsStyles;

gulp.task('vendorsStyles', function() {

  var bowerize = function(item) {
    return path.join(vendors.src, item);
  };

  //Concat Scripts
  gulp.src(vendors.concat.map(bowerize))
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest(vendors.dest));

  //Non-concat Scripts
  gulp.src(vendors.unconcat.map(bowerize))
    .pipe(gulp.dest(vendors.dest));

});