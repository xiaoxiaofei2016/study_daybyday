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
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"] // 加入ts 和 tsx
    },
    // module: {
    //   rules: [
    //     {
    //       // 对所有引入的tsx文件进行解析
    //       test: /\.tsx?$/,
    //       loader: 'ts-loader',
    //       exclude: /node_modules/,
    //       options: {
    //         // 自动将所有.vue文件转化为.vue.tsx文件
    //         appendTsSuffixTo: [/\.vue$/]
    //       }
    //     }
    //   ]
    // }
  }
}