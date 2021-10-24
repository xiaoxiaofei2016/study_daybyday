const StyleLintPlugin = require('stylelint-webpack-plugin');
const path = require('path');

module.exports = {
  publicPath: './',
  outputDir: 'dist', // 打包文件放置位置
  assetsDir: 'static', // 静态资源文件夹
  indexPath: 'index.html', // 入口文件位置，相对于outputDir
  filenameHashing: true, // 是否使用md5码
  lintOnSave: true, // eslint 错误处理，true表示对待eslint错误为warnings，warnings不会导致编译失败
  integrity: false, // 内容安全策略及子资源完整性
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        configFile: '.stylelintrc.js',
        files: ['./src/assets/**/*.less', './src/**/*.vue', './src/**/*.less', './src/App.vue'],
        fix: true
      })
    ]
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/assets/css/func.less')
      ]
    }
  },
  pages: {
    recruitment: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      // 当使用 title 选项时,template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '内聘系统'
    }
  },

  chainWebpack: config => {
    // 注册全局less变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

    config.output.filename('[name].[hash].js').end()
  },
  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//,
    /\/node_modules\/@micro-jssdk\/micro-jssdk-core\//,
    /\/node_modules\/@micro-jssdk\/project-thinking\//,
    /\/node_modules\/@micro-jssdk\/manage-auth\//
  ]
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/assets/css/theme.less')
      ]
    })
}
