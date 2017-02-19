module.exports = {
    entry: './src/assets/js/main.js',
    output: {
        path: __dirname + '/dist/assets/js/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};