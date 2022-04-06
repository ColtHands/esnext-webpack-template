const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const argv = require('yargs').argv
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const minimize = argv.mode == 'production'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './bundle.js',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize,
        minimizer: [new TerserPlugin({
            parallel: false,
            extractComments: false,
            terserOptions: {
                compress: {
                    drop_console: true
                }
            }
        })]
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.js(x?)$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    resolve: {
        extensions: [
            '.js'
        ],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        new ESLintPlugin()
    ],
    devServer: {
        static: ['public'],
        compress: false,
        port: argv.PORT || 3002,
        hot: true,
        historyApiFallback: {
            index: 'index.html'
        }
    }
};