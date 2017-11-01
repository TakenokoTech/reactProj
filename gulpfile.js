const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const webserver = require('gulp-webserver');
 
gulp.task('browserify', () => {
  browserify('./src/jsx/App.jsx', { debug: true })
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .on("error", (err) => { console.log("Error : " + err.message); })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'))
});
 
gulp.task('watch', () => {
  gulp.watch('./src/**/*.jsx', ['browserify'])
});
 
gulp.task('webserver', () => {
  gulp.src('./')
    .pipe(webserver({
      host: '127.0.0.1',
      livereload: true
    })
  );
});

gulp.task('default', ['browserify', 'watch', 'webserver']);
