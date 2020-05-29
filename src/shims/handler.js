const { createServer, proxy } = require('tencent-serverless-http')

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

const app = _interopRequireDefault(require.fromParentEnvironment('./app')).default

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop =
    app.callbackWaitsForEmptyEventLoop === true ? true : false

  const server = createServer(app.callback(), null, app.binaryTypes || [])
  return proxy(server, event, context, 'PROMISE').promise
}
