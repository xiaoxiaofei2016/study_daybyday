### 如何解析并打包typescript
根目录下新建src目录，并新建index.ts目录，
写上一句hello world

```typescript
const hello: string = 'Hello TypeScript';
```
执行 

```javascript
tsc ./src/index.ts
```
可以看到已经帮我们编译成了es5代码

#### 接下来就是打包阶段了
根目录下新建build目录，build目录下就是放置我们的配置文件了，分别是webpack.config.base.js,webpack.config.js,webpack.dev.config.js,webpack.pro.config.js

> webpack.config.js(webpack入口文件)
```javascript
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

let config = process.NODE_ENV === 'development' ? devConfig : proConfig

module.exports = merge(baseConfig, config)
```

webpack-merge可以将两个文件合并

> webpack.base.config.js(公共配置文件)

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        use: [{
          loader: 'ts-loader'
        }],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/tpl/index.html'
    })
  ]
}
```

html-webpack-plugin插件可以生成html文件，并将其他文件嵌入到该html文件中

> webpack.dev.config.js(开发环境配置文件)

```javascript
module.exports = {
  devtool: 'cheap-module-eval-source-map'
}
```

source-map可以忽略文件列信息，定位到ts源码，而不是经过loader转义后js源码，并以dataURL的形式打包到文件中，性能好

> webpack.pro.config.js(生产环境配置文件)

```javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

clean-webpack-plugin可以在每次成功构建后清空dist目录，可以减少无用的打包文件

> 这样config就已经配置好啦，接下来就是打包了

在package.json中加入以下两条命令：

```javascript
"start": "webpack-dev-server --mode=development --config ./build/webpack.config.js",
"build": "webpack --mode=production --config ./build/webpack.config.js"
```

执行 npm run build，发现根目录下打包处了dist目录，
执行 npm run start 就可以在浏览器中访问打包后的文件了

这样一个typescript简易的打包就完成了
