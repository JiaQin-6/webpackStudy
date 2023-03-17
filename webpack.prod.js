"use strict";
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");//npm i mini-css-extract-plugin -D 打包css成.css文件（注意该插件和vue-style-loader有冲突）
const { VueLoaderPlugin } = require("vue-loader");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");//css压缩
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//自动清除构建目录
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "[name]_[chunkhash:8].js",
        path: path.join(__dirname, "dist"),
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            'postcss-preset-env',
                            {
                              // 其他选项
                            },
                          ],
                        ],
                      },
                    },
                  }],//MiniCssExtractPlugin loader 和style-loader會有衝突，所以去掉style-loader
            },
            {
                test: /\.less$/i,
                use: [ "vue-style-loader",MiniCssExtractPlugin.loader, "css-loader", "less-loader",{
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: [
                          [
                            'postcss-preset-env',
                            {
                              // 其他选项
                            },
                          ],
                        ],
                      },
                    },
                  }],//MiniCssExtractPlugin loader 和style-loader會有衝突，所以去掉style-loader
            },
            { test: /\.vue$/, use: ["vue-loader"] },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "img/[name]_[hash:8].[ext]"
                        }
                    }],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "font/[name]_[hash:8].[ext]"
                        }
                    }],
            },
        ],
    },
    optimization: {
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          `...`,
          new CssMinimizerPlugin(),
        ],
      },
    plugins: [
        new HtmlWebpackPlugin({
            title: "学习webpack",
            template: path.join(__dirname, "./index.html"), //指定模板页面
            filename: "index.html", // 输出文件【注意：这里的根路径是module.exports.output.path
            showErrors: true,
            //true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
            inject: "body",
            /*向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同
                  1、true或者body：所有JavaScript资源插入到body元素的底部
                  2、head: 所有JavaScript资源插入到head元素中
                  3、false： 所有静态资源css和JavaScript都不会注入到模板文件中*/
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css"
        }),
        new CleanWebpackPlugin()
    ],
};
