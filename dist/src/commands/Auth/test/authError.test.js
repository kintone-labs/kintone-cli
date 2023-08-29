"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const validator_1 = require("../validator");
(0, globals_1.describe)('Auth command', () => {
    (0, globals_1.describe)('Validator', () => {
        (0, globals_1.describe)('App Name', () => {
            (0, globals_1.test)(`Should return 'App name missing.' when setting an empty app name`, () => {
                const invalidAppName = '';
                (0, globals_1.expect)((0, validator_1.authValidator)(invalidAppName)).toBe('App name missing.');
            });
        });
        (0, globals_1.describe)('Domain', () => {
            (0, globals_1.test)(`Should return 'Domain has to start with https.' when setting a domain without https`, () => {
                const invalidDomain = 'domain.kintone.com';
                (0, globals_1.expect)((0, validator_1.domainValidator)(invalidDomain)).toBe('Domain has to start with https.');
            });
            (0, globals_1.test)(`Should return 'Please enter a valid domain.' when setting an invalid domain`, () => {
                const invalidDomain = 'https://%*@(&#$#).k#intone.%com';
                (0, globals_1.expect)((0, validator_1.domainValidator)(invalidDomain)).toBe('Please enter a valid domain.');
            });
            (0, globals_1.test)(`Should return true when setting a valid domain`, () => {
                const validDomain = 'https://domain.kintone.com';
                (0, globals_1.expect)((0, validator_1.domainValidator)(validDomain)).toBe(true);
            });
        });
        (0, globals_1.describe)('Username', () => {
            (0, globals_1.test)(`Should return 'Username cannot be empty.' when setting an empty username`, () => {
                const emptyUsername = '';
                (0, globals_1.expect)((0, validator_1.usernameValidator)(emptyUsername)).toBe('Username cannot be empty.');
            });
            (0, globals_1.test)(`Should return true when setting a valid username`, () => {
                const validUsername = 'username';
                (0, globals_1.expect)((0, validator_1.usernameValidator)(validUsername)).toBe(true);
            });
        });
        (0, globals_1.describe)('Password', () => {
            (0, globals_1.test)(`Should return 'Password cannot be empty.' when setting an empty password`, () => {
                const emptyPassword = '';
                (0, globals_1.expect)((0, validator_1.passwordValidator)(emptyPassword)).toBe('Password cannot be empty.');
            });
            (0, globals_1.test)(`Should return true when setting a valid password`, () => {
                const validPassword = 'password';
                (0, globals_1.expect)((0, validator_1.passwordValidator)(validPassword)).toBe(true);
            });
        });
        (0, globals_1.describe)('App ID', () => {
            (0, globals_1.test)(`Should return 'App ID cannot be empty.' when setting an empty App ID`, () => {
                const emptyAppID = '';
                (0, globals_1.expect)((0, validator_1.appIDValidator)(emptyAppID)).toBe('App ID cannot be empty.');
            });
            (0, globals_1.test)(`Should return 'App ID must be a number.' when setting an invalid App ID`, () => {
                const invalidAppID = 'invalid app id';
                (0, globals_1.expect)((0, validator_1.appIDValidator)(invalidAppID)).toBe('App ID must be a number.');
            });
            (0, globals_1.test)(`Should return true when setting a valid App ID`, () => {
                const validAppID = '123';
                (0, globals_1.expect)((0, validator_1.appIDValidator)(validAppID)).toBe(true);
            });
        });
        (0, globals_1.describe)('Proxy URL', () => {
            (0, globals_1.test)(`Should return 'Proxy URL cannot be empty.' when setting an empty Proxy URL`, () => {
                const invalidProxy = '';
                (0, globals_1.expect)((0, validator_1.proxyValidator)(invalidProxy)).toBe('Proxy URL cannot be empty.');
            });
            (0, globals_1.test)(`Should return true when setting a valid Proxy URL`, () => {
                const validProxy = 'https://example.proxy.com';
                (0, globals_1.expect)((0, validator_1.proxyValidator)(validProxy)).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=authError.test.js.map