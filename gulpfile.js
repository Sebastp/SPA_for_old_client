'use strict';
// var enforceNodePath = require('enforce-node-path');
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    // sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    concatCss = require('gulp-concat-css'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass');



gulp.task('style', function() {
    return gulp.src('app/styles/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        //.pipe(rename('style.min.css'))
        //.pipe(cleanCSS())
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        //.pipe(gulp.dest('dist/styles'))
        //.pipe(gulp.dest('../../../dist/maps'))
        .pipe(browserSync.reload({
            stream: true
        }));
});




gulp.task('browserSync', function() {
    browserSync.init({
        proxy: 'http://localhost/dashboard/Web/app/',
        port: 3000,
        open: true,
        notify: false
    });
});


gulp.task('end', function() {
    return gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'));
});

gulp.task('end1', function() {
    return gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', autoprefixer()))
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['style', 'browserSync'], function() {
    gulp.watch('app/**/styles/**/*.scss', ['style']);
    gulp.watch('app/**/*.php', browserSync.reload);
    gulp.watch('app/**/css/**/*.css', browserSync.reload);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/**/scripts/**/*.js', browserSync.reload);
    gulp.watch('app/**/*.jpg', browserSync.reload);
    gulp.watch('app/**/*.png', browserSync.reload);
});
