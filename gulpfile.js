let gulp             = require('gulp');
let less             = require('gulp-less');
let concat           = require('gulp-concat');
let watch            = require('gulp-watch');
let fs               = require('fs');
let fileinclude      = require('gulp-file-include');
let webpack          = require('webpack');
let webpackStream    = require('webpack-stream');
let webpackConfig    = require('./webpack.config');
var WebpackDevServer = require("webpack-dev-server");

let config = {
    less: {
        path: './src/assets/less/',
        dest: './dist/assets/css/',
        watch: [
            './src/assets/less/**/*.less'
        ]
    },
    js: {
        dest: './dist/assets/js/',
        watch: [
            './src/assets/js/**/*.js'
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

        let path = config.less.path + folder + '/' + folder + '.less',
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
 * Watch
 */
gulp.task('watch', function() {
    gulp.watch(config.less.watch, ['less']);
    gulp.watch(config.views.watch, ['fileinclude']);
    gulp.watch(config.js.watch, ['webpack']);
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
 * Webpack
 */
gulp.task('webpack', function() {

    webpack(webpackConfig, function() {

    });

//     return gulp.src('./src/assets/js/main.js')
//                .pipe(webpack(webpackConfig))
//                .pipe(gulp.dest(config.js.dest));
});

/**
 * Webpack dev server
 */
gulp.task('webpack-dev-server', function() {

    new WebpackDevServer(webpack(webpackConfig), {

    }).listen(8080, "localhost", function(err) {

    });

});

/**
 * DEFAULT
 */
gulp.task('default', ['less', 'watch', 'fileinclude', 'assets', 'webpack', 'webpack-dev-server']);
