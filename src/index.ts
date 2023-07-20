#!/usr/bin/env node
import { Command } from 'commander';
import initializeCommand from './commands/Initialize/initializeCommand';
import buildCommand from './commands/Build/buildCommand';
import deployCommand from './commands/Deploy/deployCommand';
import lintCommand from './commands/Lint/lintCommand';
import devCommand from './commands/Dev/devCommand';
import authCommand from './commands/Auth/authCommand';
import * as path from 'path';
global.cliRoot = path.resolve(path.dirname(require.main.filename) + '/../');
global.currentDir = process.cwd();

const program = new Command();
program.version('0.5.0').description('kintone Node CLI');

initializeCommand(program);
buildCommand(program);
deployCommand(program);
lintCommand(program);
devCommand(program);
authCommand(program);

program.parse(process.argv);
