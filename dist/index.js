#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const docCommand_1 = require("./commands/doc/docCommand");
const configCommand_1 = require("./commands/config/configCommand");
program
    .version('0.1.0')
    .description('kintone Node CLI');
docCommand_1.default(program);
configCommand_1.default(program);
program.parse(process.argv);
//# sourceMappingURL=index.js.map