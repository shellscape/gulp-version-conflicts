'use strict';

const eslint = require('gulp-eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('lint', () => {
  const glob = [
    '**/*.js',
    '!node_modules'
  ];

  return gulp.src(glob)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
  return gulp.src('test.js', { read: false })
    .pipe(mocha());
});

gulp.task('default', ['lint']);
