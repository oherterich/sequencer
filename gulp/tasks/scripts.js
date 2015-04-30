'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();

// Scripts task (Browserify)
gulp.task('scripts', function() {
  // Single point of entry
  gulp.src(['app/scripts/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'))
  .pipe(refresh(lrserver));
});