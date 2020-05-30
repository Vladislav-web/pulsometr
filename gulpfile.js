const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "src"
    },
    notify: {
      styles: [
        'display: block; ',
        'padding: 6px 15px 3px;',
        'position: fixed;',
        'font-size: 10px;',
        'z-index: 9999;',
        'right: 0px;',
        'top: 0px;',
        'color: rgb(74, 74, 74);',
      ]
    }
  });
});

gulp.task('styles', function () {
  return gulp.src("src/sass/*.+(scss|sass)")
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename({
      prefix: "",
      suffix: ".min",
    }))
    .pipe(autoprefixer())
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
})

gulp.task('watch', function () {
  gulp.watch('src/sass/*.+(scss|sass)', gulp.parallel("styles"))
  gulp.watch('src/*.html').on('change', browserSync.reload);
})

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));