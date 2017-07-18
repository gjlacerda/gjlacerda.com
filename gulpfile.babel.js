import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import fs from 'fs';
import fileinclude from 'gulp-file-include';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

const config = {
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

gulp.task('fileinclude', function() {

    gulp.src(config.views.path)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(config.views.dest));
});

gulp.task('watch', function() {
    gulp.watch(config.less.watch, ['less']);
    gulp.watch(config.views.watch, ['fileinclude']);
    gulp.watch(config.js.watch, ['webpack']);
});

gulp.task('assets', function() {
    
    gulp.src('./src/assets/images/*')
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('webpack', function() {

    webpack(webpackConfig, function() {

    });
});

gulp.task('webpack-dev-server', function() {

    new WebpackDevServer(webpack(webpackConfig), {}).listen(8080, "localhost", function(err) {

    });
});

gulp.task('uglifyjs', function() {

    gulp.src(config.js.dest + 'bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.js.dest));

});

gulp.task('uglifycss', function() {

    gulp.src(config.less.dest + 'bundle.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.less.dest));

});

gulp.task('production', ['uglifyjs', 'uglifycss']);

gulp.task('default', ['less', 'watch', 'fileinclude', 'assets', 'webpack', 'webpack-dev-server']);
