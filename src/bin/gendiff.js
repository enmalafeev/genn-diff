#!/usr/bin/env node

import commander from 'commander';
import genDiff from '..';

const programm = commander;

programm
  .version('1.0.8')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((filepath1, filepath2, { format }) => console.log(genDiff(filepath1, filepath2, format)))
  .parse(process.argv);
