import { describe, expect, test } from '@jest/globals';
import { buildEslintRcTemplate } from '../eslintRcTemplate';

describe('Initialize command', () => {
  describe('Eslint template', () => {
    test('Should be "@cybozu/eslint-config/presets/typescript" when using TypeScript', async () => {
      const template = buildEslintRcTemplate({
        useTypescript: true,
        useWebpack: false,
        useReact: false
      });
      const isTypeScriptUsed = template.includes(
        '@cybozu/eslint-config/presets/typescript'
      );

      expect(isTypeScriptUsed).toBe(true);
    });

    test('Should be "cybozu/eslint-config/presets/react" when using React', async () => {
      const template = buildEslintRcTemplate({
        useTypescript: false,
        useWebpack: false,
        useReact: true
      });
      const isReactUsed = template.includes(
        '@cybozu/eslint-config/presets/react'
      );

      expect(isReactUsed).toBe(true);
    });

    test('Should be "@cybozu/eslint-config/presets/react-typescript" when using React and TypeScript', async () => {
      const template = buildEslintRcTemplate({
        useTypescript: true,
        useWebpack: false,
        useReact: true
      });
      const isReactWithTypeScriptUsed = template.includes(
        '@cybozu/eslint-config/presets/react-typescript'
      );

      expect(isReactWithTypeScriptUsed).toBe(true);
    });

    test('Should be "es6" when environment is not set', async () => {
      const template = buildEslintRcTemplate({
        useTypescript: false,
        useWebpack: false,
        useReact: false
      });
      const isEs6Used = template.includes('es6');

      expect(isEs6Used).toBe(true);
    });
  });
});
