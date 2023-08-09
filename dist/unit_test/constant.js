"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIVATE_KEY = exports.PROJECT_TYPE = exports.WEBPACK_CONTENT = exports.DIR_BUILD_PATH = exports.OPTIONS_BUILD = exports.APP_NAME = void 0;
const path_1 = __importDefault(require("path"));
exports.APP_NAME = 'test-app';
exports.OPTIONS_BUILD = ['node', 'build', '--app-name', exports.APP_NAME];
exports.DIR_BUILD_PATH = path_1.default.resolve(__dirname, `../unit_test/build/`);
exports.WEBPACK_CONTENT = 'webpack';
exports.PROJECT_TYPE = {
    PLUGIN: 'Plugin',
    CUSTOMIZATION: 'Customization'
};
exports.PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgqlIuw9D/Y3Af/iSRRF/liwNbL07OV72/PI3CZSXnRh7eeee3et4
s9Qkrkp/2kq9BFnA4XKelz9abONwRtwUVhJqhTN5v6zBMJ+KgnglTBRtr7f3Bf1m
TIYkdWr1KMiwDElHCy7zdkkKDKFNdslkf9023fddgRMnZXHCBJIQl7pfvu4Wr/Q=
-----END RSA PRIVATE KEY-----
`;
//# sourceMappingURL=constant.js.map