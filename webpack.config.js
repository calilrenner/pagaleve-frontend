const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist', 'bundle'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
  ],
};
