var gulp       = require('gulp');
var copyboy    = require('../util/copyboy');
var fonts      = require('../config').fonts;

gulp.task('fonts', copyboy(fonts.src, fonts.dest));