"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyWhenValidator = exports.proxyValidator = exports.useProxyValidator = exports.appIDValidator = exports.passwordValidator = exports.usernameValidator = exports.domainValidator = exports.authValidator = void 0;
const constant_1 = require("../../constant");
const string_1 = require("../../utils/string");
const authValidator = (params) => {
    if (!params.appName) {
        return constant_1.ERRORS.APP_NAME_MISSING;
    }
    return false;
};
exports.authValidator = authValidator;
const domainValidator = (domain) => {
    if (!domain.startsWith('https://'))
        return constant_1.ERRORS.DOMAIN_STARTS_WITH_HTTPS;
    if (!(0, string_1.isDomain)(domain)) {
        return constant_1.ERRORS.VALID_DOMAIN;
    }
    return true;
};
exports.domainValidator = domainValidator;
const usernameValidator = (username) => {
    if (!username) {
        return constant_1.ERRORS.USER_NAME_EMPTY;
    }
    return true;
};
exports.usernameValidator = usernameValidator;
const passwordValidator = (password) => {
    if (!password) {
        return constant_1.ERRORS.PASSWORD_EMPTY;
    }
    return true;
};
exports.passwordValidator = passwordValidator;
const appIDValidator = (appID) => {
    if (!appID) {
        return constant_1.ERRORS.APP_ID_EMPTY;
    }
    const numberMatch = appID.match(/(^-?\d+|^\d+\.\d*|^\d*\.\d+)(e\d+)?$/);
    // If a number is found, return that appID.
    if (!numberMatch) {
        return constant_1.ERRORS.APP_ID_NUMBER;
    }
    return true;
};
exports.appIDValidator = appIDValidator;
const useProxyValidator = (cmd) => !cmd.useProxy && !cmd.proxy;
exports.useProxyValidator = useProxyValidator;
const proxyValidator = (proxy) => {
    if (!proxy) {
        return constant_1.ERRORS.PROXY_EMPTY;
    }
    return true;
};
exports.proxyValidator = proxyValidator;
const proxyWhenValidator = (cmd, curAnswers) => (cmd.useProxy || curAnswers.useProxy) && !cmd.proxy;
exports.proxyWhenValidator = proxyWhenValidator;
//# sourceMappingURL=validator.js.map