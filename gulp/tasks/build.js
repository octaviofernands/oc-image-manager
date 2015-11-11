var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(){
  runSequence(
    ['fonts'],
    ['scripts', 'styles'],
    ['vendors', 'vendorsStyles']
  );
});