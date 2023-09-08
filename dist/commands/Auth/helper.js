"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configJSONAddProps = exports.updateAuthJSON = void 0;
const updateAuthJSON = ({ authJSON, cmd, answer }) => {
    authJSON.domain = (cmd === null || cmd === void 0 ? void 0 : cmd.domain) || answer.domain;
    authJSON.username = (cmd === null || cmd === void 0 ? void 0 : cmd.username) || answer.username;
    authJSON.password = (cmd === null || cmd === void 0 ? void 0 : cmd.password) || answer.password;
    if ((cmd === null || cmd === void 0 ? void 0 : cmd.proxy) || answer.proxy)
        authJSON.proxy = (cmd === null || cmd === void 0 ? void 0 : cmd.proxy) || answer.proxy;
    return authJSON;
};
exports.updateAuthJSON = updateAuthJSON;
const configJSONAddProps = ({ configJSON, cmd, answer }) => {
    if (!configJSON.appID)
        configJSON.appID = (cmd === null || cmd === void 0 ? void 0 : cmd.appID) || answer.appID;
    return configJSON;
};
exports.configJSONAddProps = configJSONAddProps;
//# sourceMappingURL=helper.js.map