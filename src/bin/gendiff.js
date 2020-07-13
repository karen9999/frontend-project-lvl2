#!/usr/bin/env node
import program from 'commander';
import gendiff from '../index';

program
  .version('0.0.1')
  .arguments('<firstConfig> <secondConfig> <format>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((fileName1, fileName2, format = 'recursive') => console.log(gendiff(fileName1, fileName2, format)));
program.parse(process.argv);
