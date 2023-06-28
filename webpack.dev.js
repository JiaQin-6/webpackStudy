"use strict";
const {merge} = require('webpack-merge');
const path = require("path");
const webpack = require("webpack");
const ESLintPlugin = require('eslint-webpack-plugin');//cnpm i eslint babel-loader eslint-plugin-vue eslint-webpack-plugin eslint-config-airbnb-base eslint-plugin-import eslint-config-airbnb -D
const baseConfig = require('./webpack.base');
const devConfig = {
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist"),
        publicPath:'/',
      },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    "css-loader",
                    {
                        loader: "px2rem-loader",//npm i px2rem-loader -D (结合lib-flexible使用， npm i lib-flexible -S)
                        options: {
                            remUnit: 75,//1rem = 75px
                            remPrecision: 8,//小数点位数
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    "vue-style-loader",
                    "css-loader",
                    "less-loader",
                    {
                        loader: "px2rem-loader",
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        
        new webpack.HotModuleReplacementPlugin(),
        new ESLintPlugin({
            fix: true, //自动修复
        }),
    ],
    watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略文件
        aggregateTimeout: 300, //300ms后执行
        poll: 1000, //每秒询问1000次系统文件是否有变化
    },
    devServer: {
        static: {
            // static: ['assets']
            directory: path.join(__dirname, "dist"),
        },
        port: 5000,
        hot: true,
        open: true,
    },
    devtool: 'source-map',
    stats: "errors-only",//仅显示错误信息
}
module.exports = merge(baseConfig, devConfig)