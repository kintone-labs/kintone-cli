import { describe, expect, test } from '@jest/globals';
import { isURL } from '../string';

describe('Utils', () => {
  describe('URL', () => {
    test('Should be "false" when setting invalid url', async () => {
      const url = 'http://www.example{23}.com/and%26here.html';

      expect(isURL(url)).toBe(false);
    });

    test('Should be "true" when setting valid url', async () => {
      const url = 'https://kintone.dev/';

      expect(isURL(url)).toBe(true);
    });
  });
});
