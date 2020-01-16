[![Serverless Koa Tencent Cloud](https://img.serverlesscloud.cn/20191226/1577361724216-koajs_width.png)](http://serverless.com)

# @serverless/tencent-koa

Easily deploy [koa](https://koajs.com/) applications to Tencent Cloud's serverless infrastructure using this Serverless Framework Component. Your application will auto-scale, never charge you for idle time, and require little-to-zero administration.

&nbsp;

- [请点击这里查看中文版部署文档](./README.md)

1. [Install](#1-install)
2. [Create](#2-create)
3. [Configure](#3-configure)
4. [Deploy](#4-deploy)
5. [Remove](#5-remove)

&nbsp;

&nbsp;

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
const koa = require('koa');
const app = new koa();

app.use(async (ctx, next) => {
  if (ctx.path !== '/') return next();
  ctx.body = 'Hello from Koa';
});

// don't forget to export!
module.exports = app;
```

### 3. Configure

```yml
# serverless.yml

koa:
  component: '@serverless/tencent-koa'
  inputs:
    region: ap-shanghai
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
  DEBUG ─ Compressing function KoaComponent_7xRrrd file to /Users/dfounderliu/Desktop/temp/code/.serverless/KoaComponent_7xRrrd.zip.
  DEBUG ─ Compressed function KoaComponent_7xRrrd file successful
  DEBUG ─ Uploading service package to cos[sls-cloudfunction-ap-shanghai-code]. sls-cloudfunction-default-KoaComponent_7xRrrd-1572512568.zip
  DEBUG ─ Uploaded package successful /Users/dfounderliu/Desktop/temp/code/.serverless/KoaComponent_7xRrrd.zip
  DEBUG ─ Creating function KoaComponent_7xRrrd
  DEBUG ─ Created function KoaComponent_7xRrrd successful
  DEBUG ─ Starting API-Gateway deployment with name koa.TencentApiGateway in the ap-shanghai region
  DEBUG ─ Using last time deploy service id service-n0vs2ohb
  DEBUG ─ Updating service with serviceId service-n0vs2ohb.
  DEBUG ─ Endpoint ANY / already exists with id api-9z60urs4.
  DEBUG ─ Updating api with api id api-9z60urs4.
  DEBUG ─ Service with id api-9z60urs4 updated.
  DEBUG ─ Deploying service with id service-n0vs2ohb.
  DEBUG ─ Deployment successful for the api named koa.TencentApiGateway in the ap-shanghai region.

  koa:
    region:              ap-shanghai
    functionName:        KoaComponent_7xRrrd
    apiGatewayServiceId: service-n0vs2ohb
    url:                 http://service-n0vs2ohb-1300415943.ap-shanghai.apigateway.myqcloud.com/release/

  36s › koa › done
```

You can now visit the output URL in the browser, and you should see the koa response.

### 5. Remove

```
$ sls remove --debug

  DEBUG ─ Flushing template state and removing all components.
  DEBUG ─ Removed function KoaComponent_MHrAzr successful
  DEBUG ─ Removing any previously deployed API. api-kf2hxrhc
  DEBUG ─ Removing any previously deployed service. service-4ndfl6pz

  13s › koa › done
```

### New to Components?

Checkout the [Serverless Components](https://github.com/serverless/components) repo for more information.
