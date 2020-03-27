[![Serverless Koa Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361724216-koajs_width.png)](http://serverless.com)

# 腾讯云 Koa 组件

[![npm](https://img.shields.io/npm/v/%40serverless%2Ftencent-koa)](http://www.npmtrends.com/%40serverless%2Ftencent-koa)
[![NPM downloads](http://img.shields.io/npm/dm/%40serverless%2Ftencent-koa.svg?style=flat-square)](http://www.npmtrends.com/%40serverless%2Ftencent-koa)

简体中文 | [English](https://github.com/serverless-components/tencent-koa/blob/master/README.en.md)

## 简介

使用腾讯云 Koa 组件，可快速的在腾讯云创建，配置和管理一个 [Koa 框架](https://koajs.com/) 服务。

## 目录

1. [安装](#1-安装)
2. [创建](#2-创建)
3. [配置](#3-配置)
4. [部署](#4-部署)
5. [移除](#5-移除)

### 1. 安装

通过 npm 安装 serverless

```console
$ npm install -g serverless
```

### 2. 创建

本地创建 `serverless.yml` 文件和 `app.js`文件：

```console
$ touch serverless.yml
```

初始化一个新的 npm 包，并安装 koa:

```
npm init              # 创建后持续回车
npm i --save koa  # 安装 koa
```

创建一个 `app.js`文件，并在其中创建您的 koa App：

```console
$ touch app.js
```

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

### 3. 配置

在 serverless.yml 中进行如下配置

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

- [点击此处查看配置文档](https://github.com/serverless-components/tencent-koa/blob/master/docs/configure.md)

### 4. 部署

如您的账号未[登陆](https://cloud.tencent.com/login)或[注册](https://cloud.tencent.com/register)腾讯云，您可以直接通过`微信`扫描命令行中的二维码进行授权登陆和注册。

通过`sls`命令进行部署，并可以添加`--debug`参数查看部署过程中的信息

> 注：`sls`命令是`serverless`命令的缩写

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

部署完毕后，可以在浏览器中访问部署成功地 url。

### 5. 移除

通过以下命令移除部署的 Koa 服务。

```
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function koa-function successful
  DEBUG ─ Removing any previously deployed API. api-9415bswy
  DEBUG ─ Removing any previously deployed service. service-pnlxadhq

  14s › koa › done
```

### 账号配置（可选）

当前默认支持 CLI 扫描二维码登录，如您希望配置持久的环境变量/秘钥信息，也可以本地创建 `.env` 文件

```console
$ touch .env # 腾讯云的配置信息
```

在 `.env` 文件中配置腾讯云的 SecretId 和 SecretKey 信息并保存

如果没有腾讯云账号，可以在此[注册新账号](https://cloud.tencent.com/register)。

如果已有腾讯云账号，可以在[API 密钥管理](https://console.cloud.tencent.com/cam/capi)中获取 `SecretId` 和`SecretKey`.

```
# .env
TENCENT_SECRET_ID=123
TENCENT_SECRET_KEY=123
```

### 还支持哪些组件？

可以在 [Serverless Components](https://github.com/serverless/components) repo 中查询更多组件的信息。
