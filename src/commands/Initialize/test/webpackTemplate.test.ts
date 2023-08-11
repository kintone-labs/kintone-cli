import { describe, expect, test } from '@jest/globals';
import { buildWebpackReactTemplate } from '../webpackTemplate';

describe('Initialize command', () => {
  const params = {
    entry: 'entry',
    appName: 'app-name',
    type: 'Plugin'
  };

  describe('Webpack Template', () => {
    test('Should be true when setting "invalid type"', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: false,
        type: 'invalid type'
      });

      expect(webpackTemplate.includes("filename: 'app-name.min.js'")).toBe(
        true
      );
    });

    test('Should be true when setting Plugin type in webpack', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: false
      });

      expect(webpackTemplate.includes("filename: 'config.min.js'")).toBe(true);
    });

    test('Should be true when use TypeScript', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: true,
        useReact: false
      });

      expect(webpackTemplate.includes('config.ts')).toBe(true);
    });

    test('Should be true when setting use React and use TypeScript', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: true,
        useReact: true
      });

      expect(webpackTemplate.includes('test: /.tsx?$/,')).toBe(true);
    });

    test('Should be true when setting useReact', async () => {
      const webpackTemplate = buildWebpackReactTemplate({
        ...params,
        useTypescript: false,
        useReact: true
      });

      expect(webpackTemplate.includes('test: /.jsx?$/,')).toBe(true);
    });
  });
});
