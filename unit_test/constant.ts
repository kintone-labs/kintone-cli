import path from 'path';

export const APP_NAME = 'test-app';
export const OPTIONS_BUILD = ['node', 'build', '--app-name', APP_NAME];
export const DIR_BUILD_PATH = path.resolve(__dirname, `../unit_test/build/`);
export const WEBPACK_CONTENT = 'webpack';
export const PROJECT_TYPE = {
  PLUGIN: 'Plugin',
  CUSTOMIZATION: 'Customization'
};
