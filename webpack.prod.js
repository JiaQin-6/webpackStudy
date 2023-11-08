"use strict";
const baseConfig = require('./webpack.base');
const {merge} = require('webpack-merge');
const path = require("path");
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); //npm i mini-css-extract-plugin -D 打包css成.css文件（注意该插件和vue-style-loader有冲突）
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //css压缩
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');//npm i html-webpack-externals-plugin,使用CDN加载
const CopyWebpackPlugin = require('copy-webpack-plugin');//将public文件夹下的文件复制到打包后的dist目录中。
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;//打包体积分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");//打包速度分析工具
// const {PurgeCSSPlugin} = require('purgecss-webpack-plugin');//樹搖﹣css（但是会导致vue文件打包后样式丢失）
// const glob = require('glob');
// const PATHS = {
//     src:path.join(__dirname,'src')
// }
const smp = new SpeedMeasurePlugin();
const prodPluginConfig = smp.wrap({

})
const prodConfig = {
    output: {
        filename: "[name]_[chunkhash:8].js",
        path: path.join(__dirname, "dist"),
        publicPath:'/',
    },
    mode: "production",//默认开启tree shaking(树摇)和scope hoisting(作用域提升)
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
        //   splitChunks: {//是Webpack的一个插件，用于将代码拆分成更小的块，以实现更好的代码复用和加载性能
        //     chunks: 'all',//配置了代码拆分的范围，它表示将所有的模块（包括同步和异步加载的模块）都进行代码拆分
        //     minSize: 20000,//设置了代码拆分的最小块大小，即只有当一个模块的大小大于20KB时，才会进行代码拆分
        //     minRemainingSize: 0,//是一个优化配置，它设置了剩余模块的最小大小，当一个模块被拆分后，如果剩余的部分大小小于等于0，那么将不会再对该模块进行进一步的拆分
        //     minChunks: 1,//设置了最小共享次数，即当一个模块被引用的次数大于等于1次时，才会进行代码拆分
        //     maxAsyncRequests: 30,//分别限制了并行加载的异步模块和初始页面加载的模块的最大请求数量。这可以帮助控制并发请求数，防止请求过多导致性能问题
        //     maxInitialRequests: 30,//分别限制了并行加载的异步模块和初始页面加载的模块的最大请求数量。这可以帮助控制并发请求数，防止请求过多导致性能问题
        //     enforceSizeThreshold: 50000,//是一个优化配置，它设置了强制拆分的阈值大小，当一个模块的大小超过50KB时，将强制进行代码拆分。
        //     cacheGroups: {//是定义缓存组的配置对象。缓存组用于将模块分组，以便更好地控制代码拆分的结果
        //       defaultVendors: {//缓存组用于将来自 node_modules 目录的模块进行拆分，并设置了优先级为 -10，表示它的优先级较高。
        //         test: /[\\/]node_modules[\\/]/,
        //         priority: -10,
        //         reuseExistingChunk: true,
        //       },
        //       default: {//缓存组用于将剩余的模块进行拆分，并设置了最小共享次数为 2，表示只有当一个模块被引用的次数大于等于2次时，才会进行代码拆分
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
        new CopyWebpackPlugin({
            patterns: [
              {
                from: './public',
                to: ''
              }
            ]
          }),
        // new HtmlWebpackExternalsPlugin({//CDN
        //     externals: [
        //         {
        //             module: 'vue',
        //             entry: 'https://cdn.bootcdn.net/ajax/libs/vue/3.2.47/vue.global.min.js',
        //             global: 'Vue',
        //         },
        //     ],
        // }),
        // 打包体积分析
        //  new BundleAnalyzerPlugin(),
        // 針對css做Tree Shaking處理(但是会导致vue文件里面的样式丢失)
        // new PurgeCSSPlugin({
        //     paths:glob.sync(`${PATHS.src}/**/*`,{ nodir: true }),
        // }),
    ]
}
module.exports = merge(baseConfig, prodConfig,prodPluginConfig)