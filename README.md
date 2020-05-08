[![Serverless Koa Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361724216-koajs_width.png)](http://serverless.com)

# 腾讯云 Koa 组件

简体中文 | [English](https://github.com/serverless-components/tencent-koa/blob/v2/README.en.md)

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

本地创建 `serverless.yml` 文件：

```console
$ touch serverless.yml
```

初始化一个新的 npm 包，并安装 koa:

```
npm init              # 创建后持续回车
npm i --save koa  # 安装 koa
```

创建一个 `sls.js`文件，并在其中创建您的 koa App：

```console
$ touch sls.js
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

- [点击此处查看配置文档](https://github.com/serverless-components/tencent-koa/blob/v2/docs/configure.md)

### 4. 部署

如您的账号未[登陆](https://cloud.tencent.com/login)或[注册](https://cloud.tencent.com/register)腾讯云，您可以直接通过`微信`扫描命令行中的二维码进行授权登陆和注册。

通过`sls`命令进行部署，并可以添加`--debug`参数查看部署过程中的信息

> 注：`sls`命令是`serverless`命令的缩写

```
$ sls deploy
```

部署完毕后，可以在浏览器中访问部署成功地 url。

### 5. 移除

通过以下命令移除部署的 Koa 服务。

```
$ sls remove
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
