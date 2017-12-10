var path              = require('path')
var webpack           = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve (dir) {
  //
  return path.join(__dirname, dir)
}

module.exports = {
	entry: [
	    'webpack-dev-server/client?http://127.0.0.1:9090',
	    'webpack/hot/only-dev-server',
	    './src/js/main.js'
	],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  devServer:{
    historyApiFallback:true,
    hot:true,
    inline:true,
    port:9090
	},
  module: {
      loaders: [
          {test: /\.css$/, loader: 'style-loader!css-loader'},
          {test: /\.less$/,loader: 'style-loader!css-loader!less-loader?strictMath&noIeCompat'},
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          }
      ]
  },
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
  	new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject:   true
    })
  ]
}
