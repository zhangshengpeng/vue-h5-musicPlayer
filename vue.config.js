module.exports = {
  publicPath: './',
  outputDir: 'ls',
  // productionSourceMap: false,
  configureWebpack: {
    externals: {
      vue: 'Vue', // 左侧vue是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
      'vue-router': 'VueRouter'
      // 'vuex': 'Vuex',
      // 'axios': 'axios',
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.zsp.cool',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pwa: {
    name: '盗墓笔记听书',
    themeColor: 'rgb(54, 44, 43)'
  }
}
