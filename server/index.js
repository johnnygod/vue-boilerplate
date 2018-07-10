const path = require('path')
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require("webpack-hot-middleware");

const app = express();
const config = require('../build/webpack.dev.conf.js');
const compiler = webpack(config);

const isPROD = process.env.NODE_ENV === 'production'

if(!isPROD){
  // Tell express to use the webpack-dev-middleware and use the webpack.config.js
  // configuration file as a base.
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    quiet: true,
    noinfo: true,
  }));

  app.use(webpackHotMiddleware(compiler));
}
else{
  const distPath = path.resolve(__dirname, '../dist')
  const indexPath = path.resolve(distPath, 'index.html')
  const staticPath = path.resolve(distPath, 'static')

  app.use('/static', express.static(staticPath))

  app.use((req, res) => {
    res.sendFile(indexPath)
  })
}


// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});