#!/usr/bin/env node
import * as program from 'commander';
import docCommand from './commands/doc/docCommand'

program
    .version('0.1.0')
    .description('kintone Node CLI');

docCommand(program)

program.parse(process.argv);