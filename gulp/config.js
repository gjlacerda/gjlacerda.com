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
        dest: './dist/',
        watch: [
            './src/views/**/*.html'
        ]
    }
};

export default config;
