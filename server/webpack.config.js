var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './public/index.js',
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'main.js' //webpack-dev-middleware seems to only put this name
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-2','es2017']
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    stats: {
        colors: true
    },

    devtool: 'source-map'
};