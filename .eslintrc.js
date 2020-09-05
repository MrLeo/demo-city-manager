module.exports = {
  root: true,

  env: {
    node: true
  },

  globals: {
    wx: true,
    my: true,
    __id__: true,
    __VERSION__: true,
    __GLOBAL__: true,
    __PLATFORM__: true,
    __PLATFORM_TITLE__: true,
    __PLATFORM_PREFIX__: true
  },

  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-warning-comments": [1, { "terms": ["fixme"], "location": "start" }], // 禁止注释中出现 FIXME
    quotes: 0,// [2, 'single'], //强制使用单引号
    semi: 0, // [2, 'never'], //强制不使用分号结尾
    'max-len': [1, { "code": 200 }],
    'no-underscore-dangle': 0, // 下划线开头或结尾
    'no-bitwise': 0, // 位运算符
    'no-plusplus': 0, // 一元操作符 ++ 和 --
    'import/prefer-default-export': 0,
    'max-classes-per-file': 0,
    'eqeqeq': 1
  },

  parserOptions: {
    parser: 'babel-eslint'
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        mocha: true
      }
    }
  ],

  // plugins: [
  //   html
  // ]
}
