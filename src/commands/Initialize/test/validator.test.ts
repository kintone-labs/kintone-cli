import { describe, expect, test } from '@jest/globals';
import validator from '../validator';

describe('Initialize command', () => {
  describe('validator', () => {
    test('Should be true when setting testType', async () => {
      const params = {
        type: 'testType'
      };
      const appValidator = validator.appValidator(params) as string;

      expect(appValidator.includes('Invalid App Type')).toBe(true);
    });

    test('Should be true when setting testPreset', async () => {
      const params = {
        type: 'Customization',
        preset: 'testPreset'
      };
      const appValidator = validator.appValidator(params) as string;

      expect(appValidator.includes('Invalid Preset')).toBe(true);
    });

    test('Should be true when setting USER', async () => {
      const params = {
        type: 'Customization',
        preset: 'React',
        scope: 'USER'
      };
      const appValidator = validator.appValidator(params) as string;

      expect(appValidator.includes('Invalid Scope')).toBe(true);
    });

    test('Should be true when setting USER', async () => {
      const params = {
        type: 'Customization',
        preset: 'React',
        scope: 'USER'
      };
      const appValidator = validator.appValidator(params) as string;

      expect(appValidator.includes('Invalid Scope')).toBe(true);
    });

    test('Should be false when setting ALL', async () => {
      const params = {
        type: 'Customization',
        preset: 'React',
        scope: 'ALL'
      };
      const appValidator = validator.appValidator(params) as boolean;

      expect(appValidator).toBe(false);
    });
  });
});
