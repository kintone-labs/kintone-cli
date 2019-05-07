#!/usr/bin/env node
import * as program from 'commander';
import initializeCommand from './commands/Initialize/initializeCommand'
import buildCommand from './commands/Build/buildCommand'
import deployCommand from './commands/Deploy/deployCommand'
import * as path from 'path';
global['cliRoot'] = path.resolve(path.dirname(require.main.filename) + "/../");
global['currentDir'] = process.cwd();

program
    .version('0.1.0')
    .description('kintone Node CLI');

initializeCommand(program)
buildCommand(program)
deployCommand(program)

program.parse(process.argv);