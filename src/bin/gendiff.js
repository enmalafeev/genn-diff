#!/usr/bin/env node

import commander from 'commander';

const programm = commander;

programm
  .version('1.0.0')
  .arguments('Usage: gendiff [options] <firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
