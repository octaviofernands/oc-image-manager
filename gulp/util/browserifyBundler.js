var browserify    = require('browserify');
var watchify      = require('watchify');
var source        = require('vinyl-source-stream');
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var handleErrors  = require('./handleErrors');
var scripts       = require('../config').scripts;


function bundleScripts(isWatching) {

  return function () {

    var bundler = isWatching ? watchify(browserify(scripts.opts)) : browserify(scripts.opts);

    function rebundle() {

      return bundler.bundle()
        .on('error', handleErrors)
        .pipe(source('main.js'))
        .pipe(gulp.dest(scripts.dest))
        .on('end', function() { gutil.log('Browserify bundled.') });
    }

    bundler.on('update', function() {
      rebundle();
      gutil.log('Rebundling...');
    });

    return rebundle();
  }
}

module.exports = bundleScripts;





