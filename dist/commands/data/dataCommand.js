"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const record_1 = require("./services/record");
const dataCommand = (program) => {
    program
        .command('addRecord')
        .description('kintone Node CLI add record')
        .option('--appID <appID>', 'App ID')
        .option('--jsonData <jsonData>', 'Record JSON data')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        if (!cmd.appID) {
            console.log(chalk_1.default.redBright('App ID required'));
            return;
        }
        if (!cmd.jsonData) {
            console.log(chalk_1.default.redBright('Record JSON data required'));
            return;
        }
        let result = yield record_1.default.createRecord(cmd.appID, JSON.parse(cmd.jsonData));
        console.log(result);
    }));
    program
        .command('readRecord')
        .description('kintone Node CLI read record')
        .option('--appID <appID>', 'App ID')
        .option('--recordID <recordID>', 'Record ID')
        .action((cmd) => __awaiter(this, void 0, void 0, function* () {
        if (!cmd.appID) {
            console.log(chalk_1.default.redBright('App ID required'));
            return;
        }
        if (!cmd.recordID) {
            console.log(chalk_1.default.redBright('Record ID required'));
            return;
        }
        let result = yield record_1.default.readRecord(cmd.appID, cmd.recordID);
        console.log(result);
    }));
};
exports.default = dataCommand;
//# sourceMappingURL=dataCommand.js.map