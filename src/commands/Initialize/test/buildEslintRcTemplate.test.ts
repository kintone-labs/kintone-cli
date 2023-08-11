import { describe, expect, test } from '@jest/globals';
import { buildEslintRcTemplate } from '../eslintRcTemplate';

describe('Initialize command', () => {
  describe('buildEslintRcTemplate', () => {
    test('Should be "@cybozu/eslint-config/presets/typescript" when use TypeScript', async () => {
      const eslintRcInit = buildEslintRcTemplate({
        useTypescript: true,
        useWebpack: false,
        useReact: false
      });

      expect(
        eslintRcInit.includes('@cybozu/eslint-config/presets/typescript')
      ).toBe(true);
    });

    test('Should be "cybozu/eslint-config/presets/react" when use React', async () => {
      const eslintRcInit = buildEslintRcTemplate({
        useTypescript: false,
        useWebpack: false,
        useReact: true
      });

      expect(eslintRcInit.includes('@cybozu/eslint-config/presets/react')).toBe(
        true
      );
    });

    test('Should be "@cybozu/eslint-config/presets/react-typescript" when use React and TypeScript', async () => {
      const eslintRcInit = buildEslintRcTemplate({
        useTypescript: true,
        useWebpack: false,
        useReact: true
      });

      expect(
        eslintRcInit.includes('@cybozu/eslint-config/presets/react-typescript')
      ).toBe(true);
    });

    test('Should be es6 when do not setting env', async () => {
      const eslintRcInit = buildEslintRcTemplate({
        useTypescript: false,
        useWebpack: false,
        useReact: false
      });

      expect(eslintRcInit.includes('es6')).toBe(true);
    });
  });
});
