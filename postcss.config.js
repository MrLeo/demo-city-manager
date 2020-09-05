module.exports = {
  sourceMap: true,
  plugins: {
    // autoprefixer: {
    //   browsers: [
    //     'last 3 versions',
    //     'ie >= 9',
    //     'ff >= 30',
    //     'chrome >= 34',
    //     'safari >= 6',
    //     'opera >= 12.1'
    //   ]
    // },
    'postcss-cssnext': {}
    // 'postcss-pxtorem': {
    //   rootValue: 100, // 你在html节点设的font-size大小
    //   unitPrecision: 5, // 转rem精确到小数点多少位
    //   propList: ['*', '!border-width', 'border'], // 指定转换成rem的属性，支持 * ！(px检测区分大小写，也就是说Px/PX/pX不会被转换，可以用这个方式避免转换成rem)
    //   selectorBlackList: ['mint', 'picker'], // str/reg 指定不转换的选择器，str时包含字段即匹配
    //   replace: true,
    //   mediaQuery: false, // 媒体查询内的px是否转换
    //   minPixelValue: 2 // 小于指定数值的px不转换
    // }
    // 'postcss-import': {
    //   addModulesDirectories: ['node_modules']
    // }
  }
}
