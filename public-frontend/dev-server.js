import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const PORT = 3001;

var compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { stage: 0, plugins: ['./build/babelRelayPlugin'] }
      }
    ]
  },
  output: {filename: 'app.js', path: '/'},
  devtool: "source-map"
});

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': 'http://public-backend:3000/'},
  publicPath: '/js/',
  stats: {colors: true},
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 1000
  }
});

app.use('/node_modules', express.static('node_modules'));
app.use('*', express.static('public')); 
app.listen(PORT, () => {
  console.log(`App is now running on http://localhost:${PORT}`);
});