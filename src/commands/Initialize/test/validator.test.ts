import { describe, expect, test } from '@jest/globals';
import validator from '../validator';

describe('Initialize command', () => {
  describe('Validator', () => {
    test('Should be "Invalid App Type" when setting invalid app type', async () => {
      const params = { type: 'invalid type' };
      const errorMessage = validator.appValidator(params) as string;

      expect(errorMessage).toEqual('Invalid App Type');
    });

    test('Should be "Invalid Preset" when setting invalid preset', async () => {
      const params = {
        type: 'Customization',
        preset: 'invalid preset'
      };
      const errorMessage = validator.appValidator(params) as string;

      expect(errorMessage).toEqual('Invalid Preset');
    });

    test('Should be "Invalid Scope" when setting invalid scope', async () => {
      const params = {
        type: 'Customization',
        preset: 'React',
        scope: 'USER'
      };
      const errorMessage = validator.appValidator(params) as string;

      expect(errorMessage).toEqual('Invalid Scope');
    });

    test('Should not have an error when setting valid scope', async () => {
      const params = {
        type: 'Customization',
        preset: 'React',
        scope: 'ALL'
      };
      const isError = validator.appValidator(params) as boolean;

      expect(isError).toBe(false);
    });
  });
});
