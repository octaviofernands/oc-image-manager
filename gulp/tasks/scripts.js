var gulp              = require('gulp');
var browserifyBundler = require('../util/browserifyBundler');

gulp.task('scripts', browserifyBundler(false));
