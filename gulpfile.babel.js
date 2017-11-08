import gulp from 'gulp';
import less from 'gulp-less';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import fs from 'fs';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import eslint from 'gulp-eslint';

import gulpProduction from './gulp/gulp-production';
import gulpDefault from './gulp/gulp-default';
import gulpMove from './gulp/gulp-move';
import gulpFileInclude from './gulp/gulp-file-include';

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

gulp.task('js:lint', () => {
    return gulp.src(config.js.watch)
               .pipe(eslint({
                   useEslintrc: true
               }))
               .pipe(eslint.format())
               .pipe(eslint.failAfterError());
});

gulp.task('less', function() {
    const src = [];
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

gulp.task('watch', function() {
    gulp.watch(config.less.watch, ['less']);
    gulp.watch(config.views.watch, ['fileinclude']);
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

gulp.task('move:assets', () => {
    gulpMove('./src/assets/images/*', './dist/assets/images');
    gulpMove('./src/assets/js/main.js', './dist/assets/js/');
});

gulp.task('fileinclude', () => {
    gulpFileInclude();
});

gulp.task('default', () => {
    gulpDefault();
});

gulp.task('production', () => {
    gulpProduction();
});
