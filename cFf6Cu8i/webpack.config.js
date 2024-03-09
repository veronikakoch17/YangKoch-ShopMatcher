const path = require('path');

module.exports = {
  entry: './src/index.jsx', // Your main JSX file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'], // Enables JSX to JS transpilation
          },
        },
      },
    ],
  },
};
