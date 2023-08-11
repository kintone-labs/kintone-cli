import { describe, expect, test } from '@jest/globals';
import { buildWebpackReactTemplate } from '../webpackTemplate';

describe('Initialize command', () => {
  const params = {
    entry: 'entry',
    appName: 'app-name',
    type: 'Plugin'
  };

  describe('buildWebpackReactTemplate', () => {
    test('Should be true when setting "invalid type"', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: false,
        type: 'invalid type'
      });

      expect(
        buildWebpackReactTemplateInit.includes("filename: 'app-name.min.js'")
      ).toBe(true);
    });

    test('Should be true when setting Plugin type in webpack', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: false
      });

      expect(
        buildWebpackReactTemplateInit.includes("filename: 'config.min.js'")
      ).toBe(true);
    });

    test('Should be true when use TypeScript', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        ...params,
        useTypescript: true,
        useReact: false
      });

      expect(buildWebpackReactTemplateInit.includes('config.ts')).toBe(true);
    });

    test('Should be true when setting use React and use TypeScript', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        ...params,
        useTypescript: true,
        useReact: true
      });

      expect(buildWebpackReactTemplateInit.includes('test: /.tsx?$/,')).toBe(
        true
      );
    });

    test('Should be true when setting useReact', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: true
      });

      expect(buildWebpackReactTemplateInit.includes('test: /.jsx?$/,')).toBe(
        true
      );
    });
  });
});
