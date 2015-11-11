var gulp              = require('gulp');
var path              = require('path');
var browserifyBundler = require('../util/browserifyBundler');
var app               = require('../config').app;

gulp.task('watch', ['build'], function() {

  browserifyBundler(true)();

  gulp.watch(path.resolve(app.src, '**', '*.less'), ['styles']);

  gulp.watch(path.resolve(app.src, '**', '*.js'), ['scripts']);
});

