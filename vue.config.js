/**
 * 官方文档 {@link https://cli.vuejs.org/zh/}
 * Vue.js CLI4 Vue.config.js标准配置 {@link https://blog.csdn.net/qq_39045645/article/details/103252533}
 * vue-cli4 全面配置 {@link vue-cli4 全面配置 https://github.com/staven630/vue-cli4-config}
 */

// const path = require('path')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  lintOnSave: true, // process.env.NODE_ENV !== 'production',

  publicPath: process.env.VUE_APP_PUBLIC_PATH,

  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     title: '高新区视屏一张网平台'
  //   }
  // },

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
