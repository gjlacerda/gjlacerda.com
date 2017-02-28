let gulp             = require('gulp');
let less             = require('gulp-less');
let autoprefixer     = require('gulp-autoprefixer');
let concat           = require('gulp-concat');
let watch            = require('gulp-watch');
let fs               = require('fs');
let fileinclude      = require('gulp-file-include');
var uglify           = require('gulp-uglify');
let cleanCSS         = require('gulp-clean-css');
let webpack          = require('webpack');
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

    let src = [];

    fs.readdirSync(config.less.path).map(function(folder) {
        let path = config.less.path + folder + '/' + folder + '.less';
        src.push(path);
    });

    gulp.src(src)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.less.dest));
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
});

/**
 * Webpack dev server
 */
gulp.task('webpack-dev-server', function() {

    new WebpackDevServer(webpack(webpackConfig), {}).listen(8080, "localhost", function(err) {

    });
});

/**
 * Uglify JS
 */
gulp.task('uglifyjs', function() {

    gulp.src(config.js.dest + 'bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));

});

/**
 * Uglify CSS
 */
gulp.task('uglifycss', function() {

    gulp.src(config.less.dest + 'bundle.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.less.dest));

});

/**
 * Production
 */
gulp.task('production', ['uglifyjs', 'uglifycss']);

/**
 * DEFAULT
 */
gulp.task('default', ['less', 'watch', 'fileinclude', 'assets', 'webpack', 'webpack-dev-server']);
