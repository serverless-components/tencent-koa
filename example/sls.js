const Koa = require('koa')
const KoaRouter = require('@koa/router')
const sendFile = require('koa-sendfile')
const path = require('path')

const app = new Koa()
const router = new KoaRouter()
const isServerless = process.env.SERVERLESS
const PORT = 3000

// Routes
router.get(`/`, async (ctx) => {
  await sendFile(ctx, path.join(__dirname, 'index.html'))
})

app.use(router.allowedMethods()).use(router.routes())

// don't forget to export!
if (isServerless) {
  module.exports = app
} else {
  app.listen(PORT, () => {
    console.log(`Server start on http://localhost:${PORT}`)
  })
}
