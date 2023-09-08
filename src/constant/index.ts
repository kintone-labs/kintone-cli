import { MESSAGES } from './message';
import { ERRORS } from './error';

export const PLUGIN_CONFIG_HTML_TEMPLATE = `<span>Hello from kintone CLI</span>`;
export const DECLARE_KINTONE = 'declare let kintone: any;';
export const DEFAULT_PROJECT_VERSION = '1.0.0';
export const WRITE_FILE_OPTIONS = {
  spaces: 2,
  EOL: '\r\n'
};

export const DEPENDENCIES = {
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

export { MESSAGES, ERRORS };
