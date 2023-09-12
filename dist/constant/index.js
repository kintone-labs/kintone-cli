"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.MESSAGES = exports.DEPENDENCIES = exports.WRITE_FILE_OPTIONS = exports.DEFAULT_PROJECT_VERSION = exports.DECLARE_KINTONE = exports.PLUGIN_CONFIG_HTML_TEMPLATE = void 0;
const message_1 = require("./message");
Object.defineProperty(exports, "MESSAGES", { enumerable: true, get: function () { return message_1.MESSAGES; } });
const error_1 = require("./error");
Object.defineProperty(exports, "ERRORS", { enumerable: true, get: function () { return error_1.ERRORS; } });
exports.PLUGIN_CONFIG_HTML_TEMPLATE = `<span>Hello from kintone CLI</span>`;
exports.DECLARE_KINTONE = 'declare let kintone: any;';
exports.DEFAULT_PROJECT_VERSION = '1.0.0';
exports.WRITE_FILE_OPTIONS = {
    spaces: 2,
    EOL: '\r\n'
};
exports.DEPENDENCIES = {
    webpack: '^5.88.2',
    'webpack-cli': '^5.1.4',
    'babel-loader': '^9.1.3',
    'style-loader': '^3.3.3',
    'css-loader': '^6.8.1',
    'core-js': '^3.31.1',
    'regenerator-runtime': '^0.13.11',
    '@babel/core': '^7.22.9',
    '@babel/preset-env': '^7.22.9',
    '@babel/plugin-proposal-class-properties': '^7.18.6',
    '@babel/plugin-syntax-dynamic-import': '^7.8.3',
    '@babel/preset-typescript': '^7.22.5',
    '@babel/preset-react': '^7.22.5',
    typescript: '^5.1.6',
    '@types/react': '^17.0.56',
    '@types/react-dom': '^17.0.19',
    eslint: '^8.45.0',
    '@cybozu/eslint-config': '>=20.0.1',
    react: '^17.0.2',
    'react-dom': '^17.0.2',
    '@kintone/plugin-packer': '^7.0.4',
    '@kintone/plugin-uploader': '8.0.0',
    '@kintone/customize-uploader': '^7.0.3',
    '@kintone/kintone-ui-component': '^0.9.4',
    '@kintone/rest-api-client': '^4.0.3'
};
//# sourceMappingURL=index.js.map