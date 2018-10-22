const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const output_dir = "dist";
const output_path = path.resolve(__dirname, '..', output_dir);


module.exports = {
    entry: {
        'index': './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: output_path
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /^\.d.ts$/,
                use: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([output_dir], {
            root: path.resolve(__dirname, '..')
        })
    ]

};