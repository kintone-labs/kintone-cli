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
    spaces: 4,
    EOL: '\r\n'
};
exports.DEPENDENCIES = {
    webpack: '^5.78.0',
    'webpack-cli': '^5.0.1',
    'babel-loader': '^9.1.2',
    'style-loader': '^3.3.2',
    'css-loader': '^6.7.3',
    'core-js': '^3.30.0',
    'regenerator-runtime': '^0.13.11',
    '@babel/core': '^7.21.4',
    '@babel/preset-env': '^7.21.4',
    '@babel/plugin-proposal-class-properties': '^7.18.6',
    '@babel/plugin-syntax-dynamic-import': '^7.8.3',
    '@babel/preset-typescript': '^7.21.4',
    '@babel/preset-react': '^7.18.6',
    typescript: '^4.9.5',
    '@types/react': '^17.0.56',
    '@types/react-dom': '^17.0.19',
    eslint: '^8.38.0',
    '@cybozu/eslint-config': '>=18.0.3',
    react: '^17.0.2',
    'react-dom': '^17.0.2',
    '@kintone/plugin-packer': '^6.0.32',
    '@kintone/plugin-uploader': '7.1.10',
    '@kintone/customize-uploader': '^6.0.33',
    '@kintone/kintone-ui-component': '^0.9.3',
    '@kintone/rest-api-client': '^3.3.9'
};
//# sourceMappingURL=index.js.map