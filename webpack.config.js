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
                    drop_console: true,
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
            },
            {
                test: /\.(s(a|c)ss|styl|stylus|css)$/,
                exclude: [/node_modules/],
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader', options: { sourceMap: true, url: false }}
                ]
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                loader: 'sass-loader',
                options: { sourceMap: true }
            },
            {
                test: /\.sass$/,
                exclude: [/node_modules/],
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        indentedSyntax: true
                    },
                    sourceMap: true
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        extensions: [
            '.js',
            '.jsx'
        ],
        alias: {
            '@': path.resolve(__dirname, './src/components'),
        }
    },
    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    devServer: {
        static: ['public'],
        compress: false,
        port: argv.PORT || 3003,
        hot: true,
        historyApiFallback: {
            index: 'index.html'
        }
    }
};