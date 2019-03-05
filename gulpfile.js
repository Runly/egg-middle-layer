const gulp = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const path = require('path')
const del = require('del')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')

sass.compiler = require('node-sass')

gulp.task('script_dev', function () {
  return gulp.src('app/view/_assets/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('app/public/js'))
})

gulp.task('script', function () {
  return gulp.src('app/view/_assets/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/public/js'))
})

gulp.task('style_dev', function () {
  return gulp.src('app/view/_assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/public/css'))
})

gulp.task('style', function () {
  return gulp.src('app/view/_assets/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(gulp.dest('app/public/css'))
})

gulp.task('auto_dev', function () {
  let styleWatcher = gulp.watch('app/view/_assets/css/*.scss', gulp.series('style_dev'))

  // 在删除scss文件时，删除对应css的文件
  styleWatcher.on('unlink', function (filePath) {
    del('app/public/css/' + path.basename(filePath, '.scss') + '.css')
  })

  let scriptWatcher = gulp.watch('app/view/_assets/js/*.js', gulp.series('script_dev'))

  scriptWatcher.on('unlink', function (filePath) {
    del('app/public/js/' + path.basename(filePath, '.js') + '.js');
  })
})

gulp.task('auto', function () {
  let styleWatcher = gulp.watch('app/view/_assets/css/*.scss', gulp.series('style'))

  // 在删除scss文件时，删除对应css的文件
  styleWatcher.on('unlink', function (filePath) {
    del('app/public/css/' + path.basename(filePath, '.scss') + '.css')
  })

  let scriptWatcher = gulp.watch('app/view/_assets/js/*.js', gulp.series('script'))

  scriptWatcher.on('unlink', function (filePath) {
    del('app/public/js/' + path.basename(filePath, '.js') + '.js');
  })
})

gulp.task('dev', gulp.parallel('style_dev', 'script_dev', 'auto_dev', function () {
  // Build the website.
}))

gulp.task('build', gulp.parallel('style', 'script', 'auto', function () {
  // Build the website.
}))