const { generateId, getServerlessSdk } = require('./lib/utils')
const execSync = require('child_process').execSync
const path = require('path')
const axios = require('axios')

const instanceYaml = {
  org: 'orgDemo',
  app: 'appDemo',
  component: 'koa@dev',
  name: `koa-integration-tests-${generateId()}`,
  stage: 'dev',
  inputs: {
    region: 'ap-guangzhou',
    runtime: 'Nodejs10.15',
    apigatewayConf: { environment: 'test' }
  }
}

const credentials = {
  tencent: {
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY,
  }
}

// get serverless construct sdk
const sdk = getServerlessSdk(instanceYaml.org)

it('deploy koa app by template', async () => {
  const instance = await sdk.deploy(instanceYaml, credentials)
  expect(instance).toBeDefined()
  expect(instance.instanceName).toEqual(instanceYaml.name)
  // get src from template by default
  expect(instance.outputs.templateUrl).toBeDefined()
  expect(instance.outputs.region).toEqual(instanceYaml.inputs.region)
  expect(instance.outputs.scf).toBeDefined()
  expect(instance.outputs.scf.runtime).toEqual(instanceYaml.inputs.runtime)
  expect(instance.outputs.apigw).toBeDefined()
  expect(instance.outputs.apigw.environment).toEqual(instanceYaml.inputs.apigatewayConf.environment)
})

it('deploy with src code', async () => {
  const srcPath = path.join(__dirname, '..', 'example')
  execSync('npm install', { cwd: srcPath })
  instanceYaml.inputs.src = srcPath

  const instance = await sdk.deploy(instanceYaml, credentials)
  const response = await axios.get(instance.outputs.apigw.url)

  expect(response.data).toContain('Serverless Framework')
  expect(instance.outputs.templateUrl).not.toBeDefined()
})

it('remove koa app', async () => {
  await sdk.remove(instanceYaml, credentials)
  result = await sdk.getInstance(instanceYaml.org, instanceYaml.stage, instanceYaml.app, instanceYaml.name)

  expect(result.instance.instanceStatus).toEqual('inactive')
})
