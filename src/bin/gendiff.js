#!/usr/bin/env node

import commander from 'commander';

const programm = commander;

programm
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

console.log('app is running');
