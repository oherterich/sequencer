var gulp = require('gulp');
var embedlr = require('gulp-embedlr');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();
var express = require('express');
var livereload = require('connect-livereload');
var livereloadport = 35729;
var serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./dist'));
// Redirects everything back to our index.html
server.all('/*', function(req, res) {
  res.sendfile('index.html', {root: 'dist'});
});

gulp.task('watch', ['lint'], function() {
// Start webserver
  server.listen(serverport);
  // Start live reload
  refresh.listen(livereloadport);

  // Watch our scripts
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'],[
    'lint',
    'scripts'
  ]);

  gulp.watch(['app/index.html', 'app/views/**/*.html'], [
    'views'
  ]);

  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);
});