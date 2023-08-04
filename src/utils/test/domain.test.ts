import { describe, expect, test } from '@jest/globals';
import { isDomain } from '../string';

describe('Utils', () => {
  describe('Domain', () => {
    test('Should be "false" when setting domain name invalid', async () => {
      const input = '127.0.0:8080';

      expect(isDomain(input)).toBe(false);
    });

    test('Should be "true" when setting domain name valid', async () => {
      const input = 'sdd.kintone.com';

      expect(isDomain(input)).toBe(true);
    });
  });
});
