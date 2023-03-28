module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'plugin:vue/essential',//这是vue的默认规则
      'airbnb-base',//eslint推荐的规则（即默认配置）
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      'vue',
    ],
    rules: {
      "no-console":"off",
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
    },
   
  };
  