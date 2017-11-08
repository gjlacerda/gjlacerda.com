import gulp from 'gulp';

const gulpMove = (src, dest) => {
    gulp.src(src)
        .pipe(gulp.dest(dest));
};

export default gulpMove;