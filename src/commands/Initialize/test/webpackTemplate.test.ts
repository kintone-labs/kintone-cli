import { describe, expect, test } from '@jest/globals';
import { buildWebpackReactTemplate } from '../webpackTemplate';

describe('Initialize command', () => {
  describe('buildWebpackReactTemplate', () => {
    test('Should be true when setting testType', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        entry: 'testEntry',
        useTypescript: false,
        useReact: false,
        appName: 'testAppName',
        type: 'testType'
      });

      expect(
        buildWebpackReactTemplateInit.includes(
          "path.resolve('testAppName/source/testEntry')"
        )
      ).toBe(true);
    });

    test('Should be true when setting Plugin', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        entry: 'testEntry',
        useTypescript: false,
        useReact: false,
        appName: 'testAppName',
        type: 'Plugin'
      });

      expect(buildWebpackReactTemplateInit.includes('testEntry')).toBe(true);
    });

    test('Should be true when setting useTypescript', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        entry: 'testEntry',
        useTypescript: true,
        useReact: false,
        appName: 'testAppName',
        type: 'Plugin'
      });

      expect(buildWebpackReactTemplateInit.includes('config.ts')).toBe(true);
    });

    test('Should be true when setting useReact and useTypescript', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        entry: 'testEntry',
        useTypescript: true,
        useReact: true,
        appName: 'testAppName',
        type: 'Plugin'
      });

      expect(buildWebpackReactTemplateInit.includes('test: /.tsx?$/,')).toBe(
        true
      );
    });

    test('Should be true when setting useReact', async () => {
      const buildWebpackReactTemplateInit = buildWebpackReactTemplate({
        entry: 'testEntry',
        useTypescript: false,
        useReact: true,
        appName: 'testAppName',
        type: 'Plugin'
      });

      expect(buildWebpackReactTemplateInit.includes('test: /.jsx?$/,')).toBe(
        true
      );
    });
  });
});
