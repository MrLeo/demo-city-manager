// https://cli.vuejs.org/zh/
// Vue.js CLI4 Vue.config.js标准配置注解 https://juejin.im/post/6844904125885317133

// const path = require('path')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  lintOnSave: true, // process.env.NODE_ENV !== 'production',

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'text-color': '#FFFFFF'
          },
          javascriptEnabled: true
        }
      }
    }
  },

  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
  }
}
