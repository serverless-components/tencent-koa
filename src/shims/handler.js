const { createServer, proxy } = require('tencent-serverless-http')
const app = require.fromParentEnvironment('./app')

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop =
    app.callbackWaitsForEmptyEventLoop === true ? true : false

  const server = createServer(app.callback(), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
