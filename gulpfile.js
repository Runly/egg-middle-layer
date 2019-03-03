const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const del = require('del')

sass.compiler = require('node-sass')

gulp.task('script', function () {
  return gulp.src('app/assets/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('app/public/js'))
})

gulp.task('style', function () {
  return gulp.src('app/assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/public/css'))
});

gulp.task('auto', function () {
  let styleWatcher = gulp.watch('app/assets/css/*.scss', gulp.series('style'))

  // 在删除scss文件时，删除对应css的文件
  styleWatcher.on('unlink', function (filePath) {
    del('app/public/css/' + path.basename(filePath, '.scss') + '.css')
  })

  let scriptWatcher = gulp.watch('app/assets/js/*.js', gulp.series('script'))

  scriptWatcher.on('unlink', function (filePath) {
    del('app/public/js/' + path.basename(filePath, '.js') + '.js');
  })
})

gulp.task('dev', gulp.parallel('style', 'script', 'auto', function () {
  // Build the website.
}))

gulp.task('build', gulp.parallel('style', 'script', 'auto', function () {
  // Build the website.
}))