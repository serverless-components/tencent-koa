'use strict';

const os = require('os');
const path = require('path');
const { version } = require('../../package');

module.exports = ({ lambdaHandlerMode }) =>
  path.join(
    os.homedir(),
    '.serverless/cache/tencent-koa',
    version,
    `serverless-handler${lambdaHandlerMode === 'dev' ? '-dev' : ''}.js`
  );
