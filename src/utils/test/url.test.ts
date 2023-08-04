import { describe, expect, test } from '@jest/globals';
import { isURL } from '../string';

describe('Utils', () => {
  describe('URL', () => {
    test('Should be "false" when setting url name invalid', async () => {
      const input = 'http://www.example{23}.com/and%26here.html';

      expect(isURL(input)).toBe(false);
    });

    test('Should be "true" when setting url name valid', async () => {
      const input = 'https://support.google.com/';

      expect(isURL(input)).toBe(true);
    });
  });
});
