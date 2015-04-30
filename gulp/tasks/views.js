var gulp = require('gulp');
var refresh = require('gulp-livereload');
var lrserver = require('tiny-lr')();

gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/'));

  //Any other view files from app/views
  gulp.src('./app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/views/'))
  // And tell the lrserver to refresh
  .pipe(refresh(lrserver));
});