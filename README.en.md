[![Serverless Koa Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361724216-koajs_width.png)](http://serverless.com)

# Tencent Koa Serverless Component

[简体中文](https://github.com/serverless-components/tencent-koa/blob/v2/README.md) | English

## Introduction

Easily deploy [koa](https://koajs.com/) applications to Tencent Cloud's serverless infrastructure using this Serverless Framework Component. Your application will auto-scale, never charge you for idle time, and require little-to-zero administration.

## Content

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)
5. [Remove](#5-remove)

### 1. Install

```console
$ npm install -g serverless
```

### 2. Create

Just create `serverless.yml` and `.env` files

```console
$ touch .env # your Tencent API Keys
$ touch sls.js
$ touch serverless.yml
```

Add the access keys of a [Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with `AdministratorAccess` in the `.env` file, using this format:

```
# .env
TENCENT_SECRET_ID=123
TENCENT_SECRET_KEY=123
```

- If you don't have a Tencent Cloud account, you could [sign up](https://intl.cloud.tencent.com/register) first.

Initialize a new NPM package and install koa:

```
npm init          # then keep hitting enter
npm i --save koa  # install koa
```

create your koa app in `sls.js`:

```js
const koa = require('koa')
const app = new koa()

app.use(async (ctx, next) => {
  if (ctx.path !== '/') return next()
  ctx.body = 'Hello from Koa'
})

// set binary types
// app.binaryTypes = [*/*];

// don't forget to export!
module.exports = app
```

### 3. Configure

```yml
# serverless.yml

org: orgDemo # (optional) serverless dashboard org. default is the first org you created during signup.
app: appDemo # (optional) serverless dashboard app. default is the same as the name property.
stage: dev # (optional) serverless dashboard stage. default is dev.
component: koa # (required) name of the component. In that case, it's koa.
name: koaDemo # (required) name of your koa component instance.

inputs:
  src:
    src: ./src # (optional) path to the source folder. default is a hello world app.
    exclude:
      - .env
  region: ap-guangzhou
  runtime: Nodejs10.15
  apigatewayConf:
    protocols:
      - http
      - https
    environment: release
```

- [Click here to view the configuration document](https://github.com/serverless-components/tencent-koa/blob/v2/docs/configure.md)

### 4. Deploy

```
$ sls deploy
```

You can now visit the output URL in the browser, and you should see the koa response.

### 5. Remove

```
$ sls remove
```

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.

## License

MIT License

Copyright (c) 2020 Tencent Cloud, Inc.
