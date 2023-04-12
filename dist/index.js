#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const initializeCommand_1 = require("./commands/Initialize/initializeCommand");
const buildCommand_1 = require("./commands/Build/buildCommand");
const deployCommand_1 = require("./commands/Deploy/deployCommand");
const lintCommand_1 = require("./commands/Lint/lintCommand");
const devCommand_1 = require("./commands/Dev/devCommand");
const authCommand_1 = require("./commands/Auth/authCommand");
const path = require("path");
global['cliRoot'] = path.resolve(path.dirname(require.main.filename) + "/../");
global['currentDir'] = process.cwd();
program
    .version('0.4.3')
    .description('kintone Node CLI');
(0, initializeCommand_1.default)(program);
(0, buildCommand_1.default)(program);
(0, deployCommand_1.default)(program);
(0, lintCommand_1.default)(program);
(0, devCommand_1.default)(program);
(0, authCommand_1.default)(program);
program.parse(process.argv);
//# sourceMappingURL=index.js.map