const plumber = require('gulp-plumber'),
    stylus = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    csscomb = require('gulp-csscomb'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    stylesPATH = {
        "input": "./dev/static/styles/",
        "ouput": "./build/static/css/"
    };

module.exports = function () {
    $.gulp.task('styles:dev', () => {
        return $.gulp.src(stylesPATH.input + 'styles.less')
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(stylus())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(sourcemaps.write())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
            .on('end', $.browserSync.reload);
    });
    $.gulp.task('styles:build', () => {
        return $.gulp.src(stylesPATH.input + 'styles.less')
            .pipe(stylus())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(csscomb())
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
    $.gulp.task('styles:build-min', () => {
        return $.gulp.src(stylesPATH.input + 'styles.less')
            .pipe(stylus())
            .pipe(autoprefixer({
                browsers: ['last 3 version']
            }))
            .pipe(csscomb())
            .pipe(csso())
            .pipe(rename('styles.min.css'))
            .pipe($.gulp.dest(stylesPATH.ouput))
    });
};