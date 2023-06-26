"use strict";
const baseConfig = require('./webpack.base');
const {merge} = require('webpack-merge');
const path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); //npm i mini-css-extract-plugin -D 打包css成.css文件（注意该插件和vue-style-loader有冲突）
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');//npm i html-webpack-externals-plugin,使用CDN加载
const prodConfig = {
    output: {
        filename: "[name]_[chunkhash:8].js",
        path: path.join(__dirname, "dist"),
    },
    mode: "production",//默认开启tree shaking和scope hoisting
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader", //MiniCssExtractPlugin loader 和style-loader,vue-style-loader會有衝突，所以去掉style-loader
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // 其他选项
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "px2rem-loader", //npm i px2rem-loader -D (结合lib-flexible使用， npm i lib-flexible -S)
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader",
                    {
                        loader: "postcss-loader", //MiniCssExtractPlugin loader 和style-loader會有衝突，所以去掉style-loader
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // 其他选项
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    {
                        loader: "px2rem-loader", //npm i px2rem-loader -D (结合lib-flexible使用， npm i lib-flexible -S)
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            `...`,
            new CssMinimizerPlugin(),
        ],
        //分离页面公共文件
        // optimization: {
        //   splitChunks: {
        //     chunks: 'all',
        //     minSize: 20000,
        //     minRemainingSize: 0,
        //     minChunks: 1,
        //     maxAsyncRequests: 30,
        //     maxInitialRequests: 30,
        //     enforceSizeThreshold: 50000,
        //     cacheGroups: {
        //       defaultVendors: {
        //         test: /[\\/]node_modules[\\/]/,
        //         priority: -10,
        //         reuseExistingChunk: true,
        //       },
        //       default: {
        //         minChunks: 2,
        //         priority: -20,
        //         reuseExistingChunk: true,
        //       },
        //     },
        //   },
        // },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css",
        }),
        new HtmlWebpackExternalsPlugin({//CDN
            externals: [
                {
                    module: 'vue',
                    entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.global.min.js',
                    global: 'Vue',
                },
            ],
        }),
    ]
}
module.exports = merge(baseConfig, prodConfig)