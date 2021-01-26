[![Serverless Koa Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361724216-koajs_width.png)](http://serverless.com)

# 腾讯云 Koa 组件

## 简介

使用腾讯云 Koa 组件，可快速的在腾讯云创建，配置和管理一个 [Koa 框架](https://koajs.com/) 服务。

## 目录

1. [安装](#1-安装)
2. [创建](#2-创建)
3. [配置](#3-配置)
4. [部署](#4-部署)
5. [移除](#5-移除)

### 1. 安装

通过 npm 全局安装 [serverless cli](https://github.com/serverless/serverless)

```bash
$ npm install -g serverless
```

### 2. 创建

通过如下命令和模板链接，快速创建一个 koa 应用：

```bash
$ serverless init koa-starter --name example
$ cd example
```

### 3. 部署

在 `serverless.yml` 文件所在的项目根目录，运行以下指令，将会弹出二维码，直接扫码授权进行部署：

```
serverless deploy
```

> **说明**：如果鉴权失败，请参考 [权限配置](https://cloud.tencent.com/document/product/1154/43006) 进行授权。

部署完成后，控制台会打印相关的输出信息，您可以通过 `${output:${stage}:${app}:apigw.url}` 的形式在其他 `serverless` 组件中引用该组件的 API 网关访问链接（或通过类似的形式引用该组建其他输出结果），具体的，可以查看完成的输出文档：

- [点击此处查看输出文档](https://github.com/serverless-components/tencent-koa/tree/master/docs/output.md)

### 4. 配置

koa 组件支持 0 配置部署，也就是可以直接通过配置文件中的默认值进行部署。但你依然可以修改更多可选配置来进一步开发该 koa 项目。

以下是 koa 组件的 `serverless.yml`配置示例：

```yml
# serverless.yml

org: orgDemo # (optional) serverless dashboard org. default is the first org you created during signup.
app: appDemo # (optional) serverless dashboard app. default is the same as the name property.
stage: dev # (optional) serverless dashboard stage. default is dev.
component: koa # (required) name of the component. In that case, it's koa.
name: koaDemo # (required) name of your koa component instance.

inputs:
  src:
    src: ./ # (optional) path to the source folder. default is a hello world app.
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

- [点击此处查看配置文档](https://github.com/serverless-components/tencent-koa/tree/master/docs/configure.md)

### 5. 移除

通过以下命令移除部署的 Koa 服务。

```
$ serverless remove
```

### 账号配置（可选）

当前默认支持 CLI 扫描二维码登录，如您希望配置持久的环境变量/秘钥信息，也可以本地创建 `.env` 文件

```bash
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

## 静态资源服务

如果想要支持返回静态资源，比如图片之类的，需要在入口文件 `sls.js` 中指定相关 `MIME` 类型的文件为二进制，这样云函数在返回请求结果给 API 网关是，会对指定类型进行 `Base64` 编码，最终返回给客户端才能正常显示。如下：

```js
const koa = require('koa')
const app = koa()

// Routes
// ...

app.binaryTypes = ['*/*']

module.exports = app
```

`['*/*']` 代表所有文件类型将进行 `Base64` 编码，如果需要定制化，可以配置为 `['image/png']`，意思是指定 `png` 格式的图片类型。

更多文件类型的 `MIME` 类型，可参考 [mime-db](https://github.com/jshttp/mime-db/blob/master/db.json)。

### slsInitialize 应用初始化

有些时候，Koa 服务在启动前，需要进行一个初始化操作，比如数据库建连，就可以通过在 Koa 实例对象上添加 `slsInitialize` 函数来实现，如下：

```js
const Koa = require('koa')
const mysql = require('mysql2/promise')

const app = new Koa()

// ...

app.slsInitialize = async () => {
  app.db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  })
}

// don't forget to export!
module.exports = app
```

这样应用部署到云函数后，在函数服务逻辑执行前，会先执行 `slsInitialize()` 函数，来初始化数据库连接。

## 文件上传

[文件上传教程](https://github.com/serverless-components/tencent-koa/tree/master/docs/upload.md)

## License

MIT License

Copyright (c) 2020 Tencent Cloud, Inc.
