'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('default', ['dev']);

gulp.task('dev', function () {
  global.isDebugBuild = true;

  runSequence(
    ['views', 'lint', 'scripts', 'styles'],
    'watch'
  );
});