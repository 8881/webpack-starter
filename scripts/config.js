const ip = require('ip');

exports.DEVELOPMENT_IP = ip.address();
exports.DEVELOPMENT_PORT = 8090;
exports.DIST_PATH = `dist`;
