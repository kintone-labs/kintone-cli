import { describe, expect, test } from '@jest/globals';
import { isDomain } from '../string';

describe('Utils', () => {
  describe('Domain', () => {
    test('Should be "false" when setting domain name invalid', async () => {
      const domain = '127.0.0:8080';

      expect(isDomain(domain)).toBe(false);
    });

    test('Should be "true" when setting domain name valid', async () => {
      const domain = 'sdd-demo.cybozu.com';

      expect(isDomain(domain)).toBe(true);
    });
  });
});
