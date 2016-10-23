var gulp   = require('gulp');
var less   = require('gulp-less');
var concat = require('gulp-concat');
var watch  = require('gulp-watch');
var fs     = require('fs');

var config = {
    less: {
        path: './src/assets/less/',
        dest: './src/assets/css/',
        watch: [
            './src/assets/less/**/*.less'
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
 * WATCH
 */
gulp.task('watch', function() {
    gulp.watch(config.less.watch, ['less']);
});

/**
 * DEFAULT
 */
gulp.task('default', ['less', 'watch']);
