[![Serverless Koa Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361724216-koajs_width.png)](http://serverless.com)

# Tencent Koa Serverless Component

[![npm](https://img.shields.io/npm/v/%40serverless%2Ftencent-koa)](http://www.npmtrends.com/%40serverless%2Ftencent-koa)
[![NPM downloads](http://img.shields.io/npm/dm/%40serverless%2Ftencent-koa.svg?style=flat-square)](http://www.npmtrends.com/%40serverless%2Ftencent-koa)

[简体中文](https://github.com/serverless-components/tencent-koa/blob/master/README.md) | English

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
$ touch app.js
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

create your koa app in `app.js`:

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

koa:
  component: '@serverless/tencent-koa'
  inputs:
    region: ap-guangzhou
    functionName: koa-function
    runtime: Nodejs8.9
    code: ./
    functionConf:
      timeout: 10
      memorySize: 128
      environment:
        variables:
          TEST: vale
    apigatewayConf:
      protocols:
        - https
      environment: release
```

- [Click here to view the configuration document](https://github.com/serverless-components/tencent-koa/blob/master/docs/configure.md)

### 4. Deploy

```
$ sls --debug

  DEBUG ─ Resolving the template's static variables.
  DEBUG ─ Collecting components from the template.
  DEBUG ─ Downloading any NPM components found in the template.
  DEBUG ─ Analyzing the template's components dependencies.
  DEBUG ─ Creating the template's components graph.
  DEBUG ─ Syncing template state.
  DEBUG ─ Executing the template's components graph.
  DEBUG ─ Generating serverless handler...
  DEBUG ─ Generated serverless handler successfully.
  DEBUG ─ Compressing function koa-function file to /Users/yugasun/Desktop/Develop/serverless/tencent-koa/example/.serverless/koa-function.zip.
  DEBUG ─ Compressed function koa-function file successful
  DEBUG ─ Uploading service package to cos[sls-cloudfunction-ap-guangzhou-code]. sls-cloudfunction-default-koa-function-1584364164.zip
  koa-function [████████████████████████████████████████] 100% | ETA: 0s | Speed: 923.87k/s
  DEBUG ─ Uploaded package successful /Users/yugasun/Desktop/Develop/serverless/tencent-koa/example/.serverless/koa-function.zip
  DEBUG ─ Creating function koa-function
  DEBUG ─ Updating code...
  DEBUG ─ Updating configure...
  DEBUG ─ Created function koa-function successful
  DEBUG ─ Setting tags for function koa-function
  DEBUG ─ Creating trigger for function koa-function
  DEBUG ─ Deployed function koa-function successful
  DEBUG ─ Starting API-Gateway deployment with name ap-guangzhou-apigateway in the ap-guangzhou region
  DEBUG ─ Using last time deploy service id service-pnlxadhq
  DEBUG ─ Updating service with serviceId service-pnlxadhq.
  DEBUG ─ Endpoint ANY / already exists with id api-9415bswy.
  DEBUG ─ Updating api with api id api-9415bswy.
  DEBUG ─ Service with id api-9415bswy updated.
  DEBUG ─ Deploying service with id service-pnlxadhq.
  DEBUG ─ Deployment successful for the api named ap-guangzhou-apigateway in the ap-guangzhou region.

  koa:
    functionName:        koa-function
    functionOutputs:
      ap-guangzhou:
        Name:        koa-function
        Runtime:     Nodejs8.9
        Handler:     serverless-handler.handler
        MemorySize:  128
        Timeout:     10
        Region:      ap-guangzhou
        Namespace:   default
        Description: This is a template function
    region:              ap-guangzhou
    apiGatewayServiceId: service-pnlxadhq
    url:                 https://service-pnlxadhq-1251556596.gz.apigw.tencentcs.com/release/
    cns:                 (empty array)

  36s › koa › done
```

You can now visit the output URL in the browser, and you should see the koa response.

### 5. Remove

```
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function koa-function successful
  DEBUG ─ Removing any previously deployed API. api-9415bswy
  DEBUG ─ Removing any previously deployed service. service-pnlxadhq

  14s › koa › done
```

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
