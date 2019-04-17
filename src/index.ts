#!/usr/bin/env node
import * as program from 'commander';
import docCommand from './commands/doc/docCommand'
import configCommand from './commands/config/configCommand'
import dataCommand from './commands/data/dataCommand';

program
    .version('0.1.0')
    .description('kintone Node CLI');

docCommand(program)
configCommand(program)
dataCommand(program)

program.parse(process.argv);