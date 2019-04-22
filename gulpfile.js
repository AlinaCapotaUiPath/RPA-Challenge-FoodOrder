'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let clean = require('gulp-clean');
let sass = require('gulp-sass');

let path = require('path');

let baseDir = __dirname;
let nodeModulesDir = path.join(baseDir, 'node_modules');
let scriptsDir = path.join(baseDir, 'scripts');
let imagesDir = path.join(baseDir, 'images');

let distDir = path.join(baseDir, 'public');
let jsDistDir = path.join(distDir, 'js');
let cssDistDir = path.join(distDir, 'css');
let fontsDistDir = path.join(distDir, 'fonts');
let imgDistDir = path.join(distDir, 'img');

let stylesDir = path.join(baseDir, 'styles');

gulp.task('clean', () => {

    return gulp.src(distDir, {read: false})
        .pipe(clean());
})

gulp.task('build:sass', () => {

    return gulp.src([
                path.join(stylesDir, 'main.scss'),
                path.join(stylesDir, 'automation-challenge.scss')
            ])
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(gulp.dest(cssDistDir));
});

gulp.task('copy:html', () => {

    return gulp.src([
                path.join(baseDir, 'index.html')
            ])
            .pipe(gulp.dest(distDir));
});

gulp.task('copy:js', () => {

    return gulp.src([
                path.join(scriptsDir, '**/*.js')
            ])
            .pipe(gulp.dest(jsDistDir));
});

gulp.task('copy:images', () => {

    return gulp.src([
                path.join(imagesDir, '**/*.*')
            ])
            .pipe(gulp.dest(imgDistDir));
});

gulp.task('copy:resources', () => {

    return gulp.src([
                path.join(baseDir, 'challenge.xlsx')
            ])
            .pipe(gulp.dest(distDir));
});

gulp.task('copy:dependencies:css', () => {

    return gulp.src([
                path.join(nodeModulesDir, 'bootstrap/dist/css/bootstrap.min.css'),
                path.join(nodeModulesDir, 'bootstrap/dist/css/bootstrap-theme.min.css')
            ])
            .pipe(gulp.dest(cssDistDir));
});

gulp.task('copy:dependencies:js', () => {

    return gulp.src([
                path.join(nodeModulesDir, 'jquery/dist/jquery.min.js')
            ])
            .pipe(gulp.dest(jsDistDir));
});

gulp.task('copy:dependencies:fonts', () => {

    return gulp.src([
                path.join(nodeModulesDir, 'bootstrap/dist/fonts/**/*.eot'),
                path.join(nodeModulesDir, 'bootstrap/dist/fonts/**/*.svg'),
                path.join(nodeModulesDir, 'bootstrap/dist/fonts/**/*.ttf'),
                path.join(nodeModulesDir, 'bootstrap/dist/fonts/**/*.woff'),
                path.join(nodeModulesDir, 'bootstrap/dist/fonts/**/*.woff2')
            ])
            .pipe(gulp.dest(fontsDistDir));
});

gulp.task('copy:dependencies', callback => runSequence('copy:dependencies:js', 'copy:dependencies:css', 'copy:dependencies:fonts', callback));

gulp.task('watch:sass', () => {

    gulp.watch(path.join(stylesDir, '**/*.scss'), ['build:sass']);
});

gulp.task('watch:html', () => {

    gulp.watch(path.join(baseDir, '**/*.html'), ['copy:html']);
});

gulp.task('watch:js', () => {

    gulp.watch(path.join(scriptsDir, '**/*.js'), ['copy:js']);
});

gulp.task('watch:all', [
    'watch:sass',
    'watch:html',
    'watch:js'
]);

gulp.task('copy', callback => runSequence('copy:html', 'copy:js', 'copy:images', 'copy:resources', 'copy:dependencies', callback));

gulp.task('build', callback => runSequence('clean', 'build:sass', 'copy', callback));

gulp.task('watch', callback => runSequence('build', 'watch:all', callback));
