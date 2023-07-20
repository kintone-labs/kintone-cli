import { describe, expect, test } from '@jest/globals';
import { isURL } from '../../src/utils/string';

describe('String handle: check', () => {
  test('Check URL -> false', async () => {
    const input = 'http://www.example{23}.com/and%26here.html';
    expect(isURL(input)).toBe(false);
  });

  test('Check URL -> true', async () => {
    const input = 'https://support.google.com/';
    expect(isURL(input)).toBe(true);
  });
});
