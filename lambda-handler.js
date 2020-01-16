// To be included with user lambda (in bundled form)

'use strict';

const { createServer, proxy } = require('tencent-serverless-http');

const server = createServer(require.fromParentEnvironment('./app').callback());

module.exports.handler = (event, context) => {
  return proxy(server, event, context, 'PROMISE').promise;
};
