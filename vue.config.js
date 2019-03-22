// 官方 https://cli.vuejs.org/zh/config/
// 下面的大多是从官方中摘取过来进行学习的，不够详细的地方访问官方
// 有些地方已经在 vue create manual 选项中预先选配置好了的，有些默认的可注释掉

// const path = require('path')
let appData = require('./data.json')
let goods = appData.goods
let seller = appData.seller
let ratings = appData.ratings

module.exports = {
  // 部署应用时的根路径(默认)
  baseUrl: '/',
  // 运行时生成的环境构建文件的目录(构建前无, 默认 dist)
  outputDir: 'dist',
  // 放置生成的静态资源的目录(路径相对于 outputDir)
  assetsDir: 'assets',
  // 指定生成 index.html 的输出路径(路径相对于 outputDir)
  indexPath: 'index.html',
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存(默认 true)
  filenameHashing: true,
  // 不管用
  /*
  configureWebpack: config => {
    Object.assign(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'js': path.resolve(__dirname, './src/assets/js'),
          'css': path.resolve(__dirname, './src/assets/stylus')
        }
      }
    })
  },
  */
  // multi-page 模式下构建应用，每个页面应该有一个对应的 JavaScript 入口文件
  // 其值应该是一个对象，对象的 key 是入口的名字，value 值是...
  /*
  pages: {
    // index: {
    // page 入口
    // entry: 'src/index/main.js',
    // 模板来源
    // template: 'public/index.html',
    // 在 dist/index.html 的输出
    // filename: 'index.html',
    // 当使用 title 选项时，
    // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    // title: 'Index Page',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    // chunks: ['chunk-vendors', 'chunk-common', 'index']
    // },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  */
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了
  // compiler: false,
  // webpack 配置
  chainWebpack: () => {},
  configureWebpack: () => {},
  // 生产环境是否生产 sourceMap 文件
  // productionSourceMap: true,
  // css 配置
  css: {
    // 是否使用 css 分离插件 ExtractTextPlugin
    // extract: true,
    // 开启 CSS source maps?
    // sourceMap: false,
    // css预设器配置项
    // loaderOptions: { css: {}, postcss: {} },
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  // parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === 'darwin',
    // host: '0.0.0.0',
    // port: 8080,
    // https: false,
    // hotOnly: false,
    // proxy: null, // 设置代理
    // before: app => {}
    before(app) {
      app.get('/api/seller', (req, res) => {
        res.json({
          errno: 0,
          data: seller
        })
      }),
      app.get('/api/goods', (req, res) => {
        res.json({
          errno: 0,
          data: goods
        })
      }),
      app.get('/api/ratings', (req, res) => {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  // 传递任何第三方插件配置
  pluginOptions: {
    // ...
  }
}
