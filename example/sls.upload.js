const Koa = require('koa')
const KoaRouter = require('@koa/router')
const multer = require('@koa/multer')
const sendFile = require('koa-sendfile')
const path = require('path')

const isServerless = process.env.SERVERLESS
const app = new Koa()
const router = new KoaRouter()
const upload = multer({ dest: isServerless ? '/tmp/upload' : './upload' })

router.get(`/`, async (ctx) => {
  await sendFile(ctx, path.join(__dirname, 'index.html'))
})
router.post('/upload', upload.single('file'), (ctx) => {
  ctx.body = {
    success: true,
    data: ctx.file
  }
})

app.use(router.routes()).use(router.allowedMethods())

if (isServerless) {
  module.exports = app
} else {
  app.listen(3000, () => {
    console.log(`Server start on http://localhost:3000`)
  })
}
