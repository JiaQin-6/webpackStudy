"use strict";
const path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");//npm i mini-css-extract-plugin -D 打包css成.css文件
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "vue-style-loader", "css-loader", "less-loader"],
      },
      { test: /\.vue$/, use: ["vue-loader"] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  watch:true,
  watchOptions:{
    ignored:/node_modules/,//忽略文件
    aggregateTimeout:300,//300ms后执行
    poll:1000,//每秒询问1000次系统文件是否有变化
  },
  devServer: {
    static: { // static: ['assets']
		directory: path.join(__dirname, 'dist')
	},
    port: 5000,
    hot:true,
    open: true,
  },
};
