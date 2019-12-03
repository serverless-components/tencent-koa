#!/usr/bin/env node

'use strict';

require('essentials');

const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
  string: ['lambda-handler-mode'],
  alias: { 'help': 'h', 'lambda-handler-mode': 'm' },
});

const usage = `Usage: ./scripts/cache-lambda-handler [-h | --help]
Generates lambda handler bundle and saves it to user cache

Options:

    --lambda-handler-mode,  -m  Lambda handler mode ('dev' or 'prod', defaults to 'prod')
    --help,                 -h  Show this message
`;

if (argv.help) {
  process.stdout.write(usage);
  return;
}

require('../lib/resolve-cached-handler-path/generate')({
  lambdaHandlerMode: argv['lambda-handler-mode'],
});
