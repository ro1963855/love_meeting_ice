const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('sass', () => {
  gulp
    .src('./src/assets/stylesheet/scss/**/*.scss')
    .pipe(sass())
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('./src/assets/stylesheet/css/'));
});

gulp.task('concat', () => {
  return gulp
    .src('./src/assets/stylesheet/css/**/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('./src/assets/stylesheet/build/'));
});

gulp.task('minify-css', ['concat'], () => {
  return gulp
    .src('./src/assets/stylesheet/build/all.css')
    .pipe(
      minifyCSS({
        keepBreaks: true,
      }),
    )
    .pipe(
      rename((path) => {
        path.basename += '.min';
        path.extname = '.css';
      }),
    )
    .pipe(gulp.dest('./src/assets/stylesheet/build/'));
});

gulp.task('typescript', () => {
  return gulp
    .src('./src/assets/javascript/ts/**/*.ts')
    .pipe(tsProject())
    .js.pipe(gulp.dest('./src/assets/javascript/js/'));
});

gulp.task('uglify', () => {
  return gulp
    .src('./src/assets/javascript/js/**/*.js')
    .pipe(uglify())
    .pipe(
      rename((path) => {
        path.basename += '.min';
        path.extname = '.js';
      }),
    )
    .pipe(gulp.dest('./src/assets/javascript/build/'));
});

gulp.task('default', ['sass', 'minify-css', 'typescript', 'uglify'], () => {
  gulp.watch('./src/assets/stylesheet/scss/**/*.scss', ['sass']);
  gulp.watch('./src/assets/stylesheet/css/**/*.css', ['minify-css']);
  gulp.watch('./src/assets/javascript/ts/**/*.ts', ['typescript']);
  gulp.watch('./src/assets/javascript/js/**/*.js', ['uglify']);
});
