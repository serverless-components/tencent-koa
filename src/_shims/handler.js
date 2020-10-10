const fs = require('fs')
const path = require('path')
const { createServer, proxy } = require('tencent-serverless-http')

let server
let app

exports.handler = async (event, context) => {
  const userSls = path.join(__dirname, '..', process.env.SLS_ENTRY_FILE)
  if (fs.existsSync(userSls)) {
    // eslint-disable-next-line
    console.log(`Using user custom entry file ${process.env.SLS_ENTRY_FILE}`)
    app = require(userSls)
  } else {
    app = require('./sls.js')
  }

  app.request.__SLS_EVENT__ = event
  app.request.__SLS_CONTEXT__ = context

  // cache server, not create repeatly
  if (!server) {
    server = createServer(app.callback(), null, app.binaryTypes || [])
  }

  context.callbackWaitsForEmptyEventLoop =
    app.callbackWaitsForEmptyEventLoop === true ? true : false

  if (app.slsInitialize && typeof app.slsInitialize === 'function') {
    await app.slsInitialize()
  }

  const result = await proxy(server, event, context, 'PROMISE')
  return result.promise
}
