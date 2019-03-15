const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./base.js');

module.exports = merge(common, {
    mode: "development",
    devtool: 'cheap-module-source-map',
    devServer: {
        contentBase: common.output.path,
        host: '127.0.0.1',
        compress: false,
        port: 8080
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});