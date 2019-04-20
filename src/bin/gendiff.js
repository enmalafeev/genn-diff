#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

const programm = commander;

programm
  .version('1.0.4')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((file1, file2) => console.log(genDiff(file1, file2)))
  .parse(process.argv);

// console.log('app is running');
