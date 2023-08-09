import { describe, expect, test } from '@jest/globals';
import { buildEslintRcTemplate } from '../eslintRcTemplate';

describe('Initialize command', () => {
  describe('buildEslintRcTemplate', () => {
    test('Should be true when setting useTypescript', async () => {
      const eslintRcinit = buildEslintRcTemplate({
        useTypescript: true,
        useWebpack: false,
        useReact: false
      });

      expect(
        eslintRcinit.includes('@cybozu/eslint-config/presets/typescript')
      ).toBe(true);
    });

    test('Should be true when setting useReact', async () => {
      const eslintRcinit = buildEslintRcTemplate({
        useTypescript: false,
        useWebpack: false,
        useReact: true
      });

      expect(eslintRcinit.includes('@cybozu/eslint-config/presets/react')).toBe(
        true
      );
    });

    test('Should be true when setting useReact and useTypescript', async () => {
      const eslintRcinit = buildEslintRcTemplate({
        useTypescript: true,
        useWebpack: false,
        useReact: true
      });

      expect(
        eslintRcinit.includes('@cybozu/eslint-config/presets/react-typescript')
      ).toBe(true);
    });

    test('Should be true when setting ues6', async () => {
      const eslintRcinit = buildEslintRcTemplate({
        useTypescript: false,
        useWebpack: false,
        useReact: false
      });

      expect(eslintRcinit.includes('es6')).toBe(true);
    });
  });
});
