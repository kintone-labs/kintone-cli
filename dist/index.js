#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const initializeCommand_1 = require("./commands/Initialize/initializeCommand");
const buildCommand_1 = require("./commands/Build/buildCommand");
const deployCommand_1 = require("./commands/Deploy/deployCommand");
const lintCommand_1 = require("./commands/Lint/lintCommand");
const devCommand_1 = require("./commands/Dev/devCommand");
const path = require("path");
global['cliRoot'] = path.resolve(path.dirname(require.main.filename) + "/../");
global['currentDir'] = process.cwd();
program
    .version('0.1.0')
    .description('kintone Node CLI');
initializeCommand_1.default(program);
buildCommand_1.default(program);
deployCommand_1.default(program);
lintCommand_1.default(program);
devCommand_1.default(program);
program.parse(process.argv);
