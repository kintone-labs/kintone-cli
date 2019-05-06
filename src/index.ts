#!/usr/bin/env node
import * as program from 'commander'
import docCommand from './commands/doc/docCommand'
import configCommand from './commands/config/configCommand'
import dataCommand from './commands/data/dataCommand'
import initializeCommand from './commands/Initialize/initializeCommand'
import lintCommand from './commands/Lint/lintCommand'
import * as path from 'path';
global['cliRoot'] = path.resolve(path.dirname(require.main.filename) + "/../");
global['currentDir'] = process.cwd();

program
    .version('0.1.0')
    .description('kintone Node CLI');

docCommand(program)
configCommand(program)
dataCommand(program)
initializeCommand(program)
lintCommand(program)

program.parse(process.argv);