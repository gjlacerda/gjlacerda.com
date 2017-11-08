import gulp from 'gulp';

const gulpDefault = () => {
    const tasks = ['less', 'watch', 'move:assets', 'fileinclude'];
    tasks.forEach(task => gulp.start(task));
};

export default gulpDefault;
