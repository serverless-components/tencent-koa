'use strict';

const ensureIterable = require('type/iterable/ensure');
const ensurePlainObject = require('type/plain-object/ensure');
const ensureString = require('type/string/ensure');
const random = require('ext/string/random');
const path = require('path');
const { Component, utils } = require('@serverless/core');
const resolveCachedHandlerPath = require('./lib/resolve-cached-handler-path');

module.exports = class TencentKoa extends Component {
  getDefaultProtocol(protocols) {
    if (protocols.map(i => i.toLowerCase()).includes('https')) {
      return 'https';
    }
    return 'http';
  }

  async default(inputs = {}) {
    inputs.name =
      ensureString(inputs.functionName, { isOptional: true }) ||
      this.state.functionName ||
      `KoaComponent_${random({ length: 6 })}`;
    inputs.codeUri = ensureString(inputs.code, { isOptional: true }) || process.cwd();
    inputs.region = ensureString(inputs.region, { default: 'ap-guangzhou' });
    inputs.include = ensureIterable(inputs.include, { default: [], ensureItem: ensureString });
    inputs.exclude = ensureIterable(inputs.exclude, { default: [], ensureItem: ensureString });
    const apigatewayConf = ensurePlainObject(inputs.apigatewayConf, { default: {} });

    if (!(await utils.fileExists(path.resolve(inputs.codeUri, 'app.js')))) {
      throw new Error(`app.js not found in ${inputs.codeUri}`);
    }

    const cachedHandlerPath = await resolveCachedHandlerPath(inputs);
    inputs.include.push(cachedHandlerPath);
    inputs.exclude.push('.git/**', '.gitignore', '.serverless', '.DS_Store');

    inputs.handler = `${path.basename(cachedHandlerPath, '.js')}.handler`;
    inputs.runtime = 'Nodejs8.9';

    const tencentCloudFunction = await this.load('@serverless/tencent-scf');

    if (inputs.functionConf) {
      inputs.timeout = inputs.functionConf.timeout || 3;
      inputs.memorySize = inputs.functionConf.memorySize || 128;
      if (inputs.functionConf.environment) inputs.environment = inputs.functionConf.environment;
      if (inputs.functionConf.vpcConfig) inputs.vpcConfig = inputs.functionConf.vpcConfig;
    }


    inputs.fromClientRemark = inputs.fromClientRemark || 'tencent-koa'
    const tencentCloudFunctionOutputs = await tencentCloudFunction(inputs);

    const output = {
      region: inputs.region,
      functionName: inputs.name,
    };

    // if not disable, then create apigateway
    if (!apigatewayConf.isDisabled) {
      const tencentApiGateway = await this.load('@serverless/tencent-apigateway');

      const apigwParam = {
        serviceName: inputs.serviceName,
        description: 'Serverless Framework tencent-koa Component',
        serviceId: inputs.serviceId,
        region: inputs.region,
        protocols: apigatewayConf.protocols || ['http'],
        environment: apigatewayConf.environment || 'release',
        endpoints: [
          {
            path: '/',
            method: 'ANY',
            function: {
              isIntegratedResponse: true,
              functionName: tencentCloudFunctionOutputs.Name,
            },
          },
        ],
      };
      if (apigatewayConf.usagePlan) apigwParam.endpoints[0].usagePlan = apigatewayConf.usagePlan;
      if (apigatewayConf.auth) apigwParam.endpoints[0].auth = inputs.apigatewayConf.auth;

      this.state.functionName = inputs.name;
      await this.save();
      apigwParam.fromClientRemark = inputs.fromClientRemark || 'tencent-koa'
      const tencentApiGatewayOutputs = await tencentApiGateway(apigwParam);

      output.apiGatewayServiceId = tencentApiGatewayOutputs.serviceId;
      output.url = `${this.getDefaultProtocol(tencentApiGatewayOutputs.protocols)}://${
        tencentApiGatewayOutputs.subDomain
      }/${tencentApiGatewayOutputs.environment}/`;
    }

    return output;
  }

  async remove(inputs = {}) {
    const removeInput = {
      fromClientRemark: inputs.fromClientRemark || 'tencent-koa'
    }
    const tencentApiGateway = await this.load('@serverless/tencent-apigateway');
    const tencentCloudFunction = await this.load('@serverless/tencent-scf');

    await tencentApiGateway.remove(removeInput);
    await tencentCloudFunction.remove(removeInput);

    return {};
  }
};
