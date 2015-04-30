var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();

gulp.task('styles', function() {
  gulp.src('app/styles/*.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // autoprefixer
  .pipe(autoprefixer( "last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('dist/css/'))
  .pipe(refresh(lrserver));
});