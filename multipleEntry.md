"use strict";

const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); //npm i mini-css-extract-plugin -D 打包css成.css文件（注意该插件和vue-style-loader有冲突）
const { VueLoaderPlugin } = require("vue-loader");//解析vue文件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //自动清除构建目录
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')//打印构建日志信息
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');//npm i html-webpack-externals-plugin,使用CDN加载
//多頁面打包
const glob = require('glob');
const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));
  Object.keys(entryFiles).map(index => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: "学习webpack",
        template: path.join(__dirname, `src/${pageName}/index.html`), //指定模板页面
        filename: `${pageName}.html`, // 输出文件【注意：这里的根路径是module.exports.output.path
        showErrors: true,
        //true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
        inject: "body",
        /*向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同
                    1、true或者body：所有JavaScript资源插入到body元素的底部
                    2、head: 所有JavaScript资源插入到head元素中
                    3、false： 所有静态资源css和JavaScript都不会注入到模板文件中*/
      }),
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
}
const {entry,HtmlWebpackPlugins} = setMPA();

module.exports = {
  entry: entry,
  output: {
    filename: "[name]_[chunkhash:8].js",
    path: path.join(__dirname, "dist"),
  },
  mode: "production",//默认开启tree shaking和scope hoisting
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
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
    // new HtmlWebpackPlugin({
    //   title: "学习webpack",
    //   template: path.join(__dirname, "./index.html"), //指定模板页面
    //   filename: "index.html", // 输出文件【注意：这里的根路径是module.exports.output.path
    //   showErrors: true,
    //   //true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
    //   inject: "body",
    //   /*向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同
    //               1、true或者body：所有JavaScript资源插入到body元素的底部
    //               2、head: 所有JavaScript资源插入到head元素中
    //               3、false： 所有静态资源css和JavaScript都不会注入到模板文件中*/
    // }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackExternalsPlugin({//CDN
      externals: [
        {
          module: 'vue',
          entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.global.min.js',
          global: 'Vue',
        },
      ],
    }),
    new friendlyErrorsWebpackPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          console.log('build error');
          process.exit(1)
        }
      })
    }
  ].concat(HtmlWebpackPlugins),
  stats: 'errors-only',
};
