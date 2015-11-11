var gulp       = require('gulp');
var changed    = require('gulp-changed');
var path       = require('path');
var chalk      = require('chalk');
var app        = require('../config').app;

module.exports = function (from, to) {

  return function () {
    var mirror  = path.dirname(from).replace(/\*/g,'');


    console.log('Copyboy is copying files...');
    console.log('From:  ' + chalk.magenta( path.dirname(from) ));
    console.log('To:    ' + chalk.cyan( path.dirname(to) ));

    return gulp.src(from)
      .pipe(changed(to))
      .pipe(gulp.dest(to));
  }

}