import { describe, expect, test } from '@jest/globals';
import validator from '../validator';

describe('Initialize command', () => {
  describe('Scope', () => {
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
