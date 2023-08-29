"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const helper_1 = require("../helper");
(0, globals_1.describe)('Auth command', () => {
    (0, globals_1.describe)('Helper', () => {
        (0, globals_1.describe)('updateAuthJSON', () => {
            (0, globals_1.test)(`Should be equivalent to cmd`, () => {
                const authJSON = {};
                const cmd = {
                    domain: 'https://domain.kintone.com',
                    username: 'user',
                    password: 'password',
                    proxy: 'http://localhost:8080'
                };
                const authJSONResult = cmd;
                (0, globals_1.expect)((0, helper_1.updateAuthJSON)({ authJSON, cmd })).toEqual(authJSONResult);
            });
            (0, globals_1.test)(`Should be equivalent to answer`, () => {
                const authJSON = {};
                const answer = {
                    domain: 'https://domain.kintone.com',
                    username: 'user',
                    password: 'password',
                    proxy: 'http://localhost:8080'
                };
                const authJSONResult = answer;
                (0, globals_1.expect)((0, helper_1.updateAuthJSON)({ authJSON, answer: answer })).toEqual(authJSONResult);
            });
        });
        (0, globals_1.describe)('configJSONAddProps', () => {
            (0, globals_1.test)(`Should be equivalent to answer`, () => {
                const configJSON = {};
                const answer = {
                    appID: '503'
                };
                const configJSONResult = answer;
                (0, globals_1.expect)((0, helper_1.configJSONAddProps)({ configJSON, answer: answer })).toEqual(configJSONResult);
            });
            (0, globals_1.test)(`Should be equivalent to cmd`, () => {
                const configJSON = {};
                const cmd = {
                    appID: '503'
                };
                const configJSONResult = cmd;
                (0, globals_1.expect)((0, helper_1.configJSONAddProps)({ configJSON, cmd })).toEqual(configJSONResult);
            });
        });
    });
});
//# sourceMappingURL=helper.test.js.map