const { createServer, proxy } = require('tencent-serverless-http')
const app = require.fromParentEnvironment('./app')

module.exports.handler = (event, context) => {
  const server = createServer(app.callback(), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
