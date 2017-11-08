import gulp from 'gulp';

const gulpProduction = () => {
    return gulp.series('less',
        'fileinclude',
        'assets',
        'uglifyjs',
        'uglifycss'
    );
};

export default gulpProduction;
