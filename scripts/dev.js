const open = require('open');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config.js');
const config = require('./config');

const compiler = webpack(webpackConfig);

let opened = false;

const devServerOptions = {
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true,
    },
    contentBase: config.DIST_PATH,
};

const openBrowser = () => {
    const address = server.listeningApp.address();
    const url = `http://${address.address}:${address.port}`;
    console.log(`[server]: ${url}`);
    open(`${url}/index.html`);
};

const server = new WebpackDevServer(compiler, devServerOptions);

compiler.plugin('done', function () {
    if (!opened) {
        opened = true;
        openBrowser();
    }
});

server.listen(config.DEVELOPMENT_PORT, config.DEVELOPMENT_IP, function (err) {
    if (err) {
        console.log(err);
    }
});

const stdIn = process.stdin;
stdIn.setEncoding('utf8');
stdIn.on('data', openBrowser);
