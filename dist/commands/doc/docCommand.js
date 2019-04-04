"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const docCommand = (program) => {
    program
        .command('help')
        .alias('h')
        .description('kintone Node CLI help')
        .action((cmd) => {
        console.log(123);
    });
};
exports.default = docCommand;
//# sourceMappingURL=docCommand.js.map