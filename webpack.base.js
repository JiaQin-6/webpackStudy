"use strict";
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动清除构建目录
const friendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin"); //打印构建日志信息
const WebpackBar = require('webpackbar');//进度条
var HtmlWebpackPlugin = require("html-webpack-plugin");
//多頁面打包
const glob = require("glob");
const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(
    path.join(__dirname, "./src/pages/*/index.js").replace(/\\/g, "/")
  ); //注意path.join()执行之后是‘\\’,window不认，需要转义
  console.log(entryFiles);
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.replace(/\\/g, "/").match(/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: "学习webpack",
        template: path.join(__dirname, `src/pages/${pageName}/index.html`), //指定模板页面
        filename: `${pageName}.html`, // 输出文件【注意：这里的根路径是module.exports.output.path
        showErrors: true,
        //true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
        inject: "body",
        /*向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同
                  1、true或者body：所有JavaScript资源插入到body元素的底部
                  2、head: 所有JavaScript资源插入到head元素中
                  3、false： 所有静态资源css和JavaScript都不会注入到模板文件中*/
      })
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};
const { entry, HtmlWebpackPlugins } = setMPA();
module.exports = {
  entry: entry,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
      { test: /\.vue$/, use: ["vue-loader"] },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "img/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "font/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer:{
    historyApiFallback:true,//解决如果是使用history的这个路由方式，刷新页面会报错问题
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new friendlyErrorsWebpackPlugin(),
    new WebpackBar({
      // color: "#85d", // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
    function () {
      this.hooks.done.tap("done", (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") === -1
        ) {
          console.log("build error");
          // process.exit(1);//用于结束node.js运行的进程。
        }
      });
    },
  ].concat(HtmlWebpackPlugins),
  // stats: "errors-only",
};
