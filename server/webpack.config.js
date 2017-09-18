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
                    presets: ['env']
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
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'public': path.resolve(__dirname, './public')
        }
    },

    devtool: 'source-map'
};