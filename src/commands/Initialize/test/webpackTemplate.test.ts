import { describe, expect, test } from '@jest/globals';
import { buildWebpackReactTemplate } from '../webpackTemplate';

describe('Initialize command', () => {
  const params = {
    entry: 'entry',
    appName: 'app-name',
    type: 'Plugin'
  };

  describe('Webpack template', () => {
    test('Should have app-name.min.js in output entry when the type is set to "invalid type"', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: false,
        type: 'invalid type'
      });

      const doesFileExist = webpackTemplate.includes(
        "filename: 'app-name.min.js'"
      );
      expect(doesFileExist).toBe(true);
    });

    test('Should have config.min.js in output entry when the type is set to "Plugin"', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: false
      });
      const doesFileExist = webpackTemplate.includes(
        "filename: 'config.min.js'"
      );

      expect(doesFileExist).toBe(true);
    });

    test('Should have config.ts file when the "useTypeScript" is set to true', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: true,
        useReact: false
      });

      const doesFileExist = webpackTemplate.includes('config.ts');
      expect(doesFileExist).toBe(true);
    });

    test('Should have rule tsx when both "useReact" and "useTypeScript" settings are set to true', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: true,
        useReact: true
      });
      const isRuleTsx = webpackTemplate.includes('test: /.tsx?$/,');

      expect(isRuleTsx).toBe(true);
    });

    test('Should have rule jsx when the "useReact" is set to true', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: true
      });
      const isRuleJsx = webpackTemplate.includes('test: /.jsx?$/,');

      expect(isRuleJsx).toBe(true);
    });
  });
});
