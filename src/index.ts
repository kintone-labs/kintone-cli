#!/usr/bin/env node
import * as program from 'commander';
import docCommand from './commands/doc/docCommand'
import configCommand from './commands/config/configCommand'
import dataCommand from './commands/data/dataCommand';
import initializeCommand from './commands/Initialize/initializeCommand'

program
    .version('0.1.0')
    .description('kintone Node CLI');

docCommand(program)
configCommand(program)
dataCommand(program)
initializeCommand(program)

program.parse(process.argv);