module.exports = {
    //env 定义代码运行的环境
    env: {
      browser: true,//浏览器
      es2021: true,//ES2021
      node: true,//Node.js
    },
    //extends 扩展配置，指定了所使用的规则集
    extends: [
      'plugin:vue/essential',//这是vue的默认规则
      // 'airbnb-base',//eslint推荐的规则（即默认配置）
    ],
    //parserOptions 解析器的选项配置
    parserOptions: {
      ecmaVersion: 'latest',//指定了使用最新版本的 ECMAScript
      sourceType: 'module',//使用模块化的代码
    },
    //plugins 指定所使用的插件,
    plugins: [
      'vue',//用于检测和分析 Vue.js 相关的代码
    ],
    //rules 定义具体的规则
    rules: {
      "no-console":"off",//禁用了 console 的使用
      // "import/no-extraneous-dependencies": ["error", {"devDependencies": true}] //该规则要求在开发环境中 (devDependencies: true) 不允许引入外部的非直接依赖模块。
    },
   
  };
  