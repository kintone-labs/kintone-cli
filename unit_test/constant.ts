import path from 'path';

export const APP_NAME = 'test-app';
export const OPTIONS_BUILD = ['node', 'build', '--app-name', APP_NAME];
export const OPTIONS_DEPLOY = ['node', 'deploy', '--app-name', APP_NAME];
export const DIR_BUILD_PATH = path.resolve(__dirname, `../unit_test/build/`);
export const WEBPACK_CONTENT = 'webpack';
export const PROJECT_TYPE = {
  PLUGIN: 'Plugin',
  CUSTOMIZATION: 'Customization'
};
export const PRIVATE_KEY = `
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgqlIuw9D/Y3Af/iSRRF/liwNbL07OV72/PI3CZSXnRh7eeee3et4
s9Qkrkp/2kq9BFnA4XKelz9abONwRtwUVhJqhTN5v6zBMJ+KgnglTBRtr7f3Bf1m
TIYkdWr1KMiwDElHCy7zdkkKDKFNdslkf9023fddgRMnZXHCBJIQl7pfvu4Wr/Q=
-----END RSA PRIVATE KEY-----
`;
