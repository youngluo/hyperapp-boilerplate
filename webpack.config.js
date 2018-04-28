const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
const NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules');
const prod = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    app: path.resolve(APP_PATH, 'index.js'),
  },
  output: {
    filename: '[name].js?v=[chunkhash:8]',
    path: BUILD_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: NODE_MODULES,
        use: 'babel-loader',
        include: APP_PATH,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: NODE_MODULES,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: 'assets/images/[name].[ext]?v=[hash:8]',
          },
        },
        include: APP_PATH,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(APP_PATH, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css?v=[contenthash:8]',
    }),
  ],
  resolve: {
    extensions: ['.js', '.less', '.png', '.jpg', '.gif', '.svg'],
  },
};

if (!prod) {
  config.devServer = {
    host: '0.0.0.0',
    port: 8080,
  };
} else {
  config.plugins.push(new OptimizeCssAssetsPlugin())
}

module.exports = config;
