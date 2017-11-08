import gulp from 'gulp';
import config from './config';
import fileinclude from 'gulp-file-include';

const gulpFileInclude = () => {
    gulp.src(config.views.path)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(config.views.dest));
};

export default gulpFileInclude;
