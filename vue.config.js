'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const TerserPlugin = require('terser-webpack-olugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack');
// const cesiumSource = './node_modules/cesium/Source'

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
  },
  // devServer: {
  //   host: '127.0.0.1', // 本地地址
  //   port: 9529, // 端口号
  //   open: true, // 配置项目在启动时自动在浏览器打开
  //   proxy: {
  //       '/api' : { // '/api'是代理标识，一般是每个接口前的相同部分
  //           target: "https://fakeapi.yoursite.com/images", // 请求地址，一般是服务器地址
  //           changeOrigin: true, // 是否进行跨域
  //           pathRewrite: { // pathRewrite的作用是把请求接口中的 '/api'替换掉，一般是替换为空""
  //               '^/api':""
  //           }
  //       }
  //   }
  // },
  //===============================================================
  // module.exports = {
  //   devServer: {
  //    proxy: {
  //       'api/private/v1/': {
  //         target: 'http://127.0.0.1:8888', // 我们要代理的地址,当匹配到上面的'api/private/v1/'时，会将http://localhost:9528 替换成 http://127.0.0.1:8888
  //         changeOrigin: true, // 是否跨越 需要设置此值为 true 才可以让本地服务代理我们发送请求
  //         pathRewrite: {
  //         // 重新路由  localhost:8888/api/login  => http://127.0.0.1:8888/api/login
  //           '^/api': '/api',
  //           '/hr': ''
  //         }
  //       }
  //     }
  //   }
  // }

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
        // 'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    // plugins: [ // 4
    //   new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Workers'), to: 'Workers' }]),
    //   new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
    //   new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
    //   new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
    //   new webpack.DefinePlugin({ // 5
    //     CESIUM_BASE_URL: JSON.stringify('./')
    //   })
    // ], 
    module: {
      // rules: [
      //   {
      //     test: /\.(glb,gltf)$/,
      //     loader: 'url-loader'
      //   }
      // ],
    },
    plugins: [
      new CopyWebpackPlugin([
        { from: 'node_modules/@liveqing/liveplayer/dist/component/crossdomain.xml' },
        { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer.swf' },
        { from: 'node_modules/@liveqing/liveplayer/dist/component/liveplayer-lib.min.js', to: 'js/' },
      ]),
    ]
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
