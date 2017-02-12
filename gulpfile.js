var gulp        = require('gulp');
var less        = require('gulp-less');
var concat      = require('gulp-concat');
var watch       = require('gulp-watch');
var fs          = require('fs');
var fileinclude = require('gulp-file-include');

var config = {
    less: {
        path: './src/assets/less/',
        dest: './dist/assets/css/',
        watch: [
            './src/assets/less/**/*.less'
        ]
    },
    views: {
        path: './src/views/index.html',
        dest: './',
        watch: [
            './src/views/**/*.html'
        ]
    }
};

/**
 * LESS
 */
gulp.task('less', function() {

    fs.readdirSync(config.less.path).map(function(folder) {

        var path = config.less.path + folder + '/' + folder + '.less',
            dest = config.less.dest + folder;

        return gulp.src(path)
                   .pipe(less())
                   .pipe(concat(folder + '.css'))
                   .pipe(gulp.dest(dest));
    });

});

/**
 * File include
 */
gulp.task('fileinclude', function() {

    gulp.src(config.views.path)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(config.views.dest));
});

/**
 * WATCH
 */
gulp.task('watch', function() {
    gulp.watch(config.less.watch, ['less']);
    gulp.watch(config.views.watch, ['fileinclude']);
});

/**
 * Move assets
 */
gulp.task('assets', function() {

    // Move imagens
    gulp.src('./src/assets/images/*')
        .pipe(gulp.dest('./dist/assets/images'));

});

/**
 * DEFAULT
 */
gulp.task('default', ['less', 'watch', 'fileinclude', 'assets']);
