module.exports = {
  publicPath: '/ls',
  outputDir: 'ls',
  productionSourceMap: false,
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
        target: 'https://www.zsp.cool',
        // target: 'http://localhost:81',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pwa: {
    name: 'z-music',
    themeColor: 'rgb(54, 44, 43)'
  }
}
