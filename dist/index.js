#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const initializeCommand_1 = __importDefault(require("./commands/Initialize/initializeCommand"));
const buildCommand_1 = __importDefault(require("./commands/Build/buildCommand"));
const deployCommand_1 = __importDefault(require("./commands/Deploy/deployCommand"));
const lintCommand_1 = __importDefault(require("./commands/Lint/lintCommand"));
const devCommand_1 = __importDefault(require("./commands/Dev/devCommand"));
const authCommand_1 = __importDefault(require("./commands/Auth/authCommand"));
const path = __importStar(require("path"));
global.cliRoot = path.resolve(path.dirname(require.main.filename) + '/../');
global.currentDir = process.cwd();
const program = new commander_1.Command();
program.version('0.5.1').description('kintone Node CLI');
(0, initializeCommand_1.default)(program);
(0, buildCommand_1.default)(program);
(0, deployCommand_1.default)(program);
(0, lintCommand_1.default)(program);
(0, devCommand_1.default)(program);
(0, authCommand_1.default)(program);
program.parse(process.argv);
//# sourceMappingURL=index.js.map