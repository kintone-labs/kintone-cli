import { describe, expect, test } from '@jest/globals';
import validator from '../validator';

describe('Initialize command', () => {
  describe('Preset', () => {
    test('Should be "Invalid Preset" when setting invalid preset', async () => {
      const params = {
        type: 'Customization',
        preset: 'invalid preset'
      };
      const errorMessage = validator.appValidator(params) as string;

      expect(errorMessage).toEqual('Invalid Preset');
    });
  });
});
