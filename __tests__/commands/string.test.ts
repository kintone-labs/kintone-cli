import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import authCommand from '../../src/commands/Auth/authCommand';
import {
  createTempDir,
  createTemplate,
  initProject,
  removeTempDir
} from '../test-helpers';
import { isURL } from '../../src/utils/string';

describe('auth command: options', () => {
  test('should have appName as "test-app"', async () => {
    const input = 'http://www.example.com/and%26here.html';
    expect(isURL(input)).toBe(false);
  });

  test('should have appName as "test-app"', async () => {
    const input = 'https://support.google.com/';
    expect(isURL(input)).toBe(true);
  });
});
