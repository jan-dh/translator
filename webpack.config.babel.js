import path from 'path';

export default {
  entry: {
    Reorder: './resources/js/src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './src/assetbundles/translatorfield/dist/js/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ]
      }
    ]
  }
};
