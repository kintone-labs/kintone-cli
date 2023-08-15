import { describe, expect, test } from '@jest/globals';
import {
  appIDValidator,
  authValidator,
  domainValidator,
  passwordValidator,
  proxyValidator,
  usernameValidator
} from '../../../src/commands/Auth/validator';

describe('auth command: validator', () => {
  test(`Should have authValidator as 'App name missing.'`, () => {
    const invalidAppName = '';
    expect(authValidator(invalidAppName)).toBe('App name missing.');
  });

  test(`Should have domainValidator as 'Domain has to start with https.'`, () => {
    const invalidDomain = 'domain.kintone.com';
    expect(domainValidator(invalidDomain)).toBe(
      'Domain has to start with https.'
    );
  });

  test(`Should have domainValidator as 'Please enter a valid domain.'`, () => {
    const invalidDomain = 'https://%*@(&#$#).k#intone.%com';
    expect(domainValidator(invalidDomain)).toBe('Please enter a valid domain.');
  });

  test(`Should have domainValidator as true`, () => {
    const validDomain = 'https://domain.kintone.com';
    expect(domainValidator(validDomain)).toBe(true);
  });

  test(`Should have usernameValidator as "Username can't be empty."`, () => {
    const emptyUsername = '';
    expect(usernameValidator(emptyUsername)).toBe("Username can't be empty.");
  });

  test(`Should have usernameValidator as true`, () => {
    const validUsername = 'tester';
    expect(usernameValidator(validUsername)).toBe(true);
  });

  test(`Should have passwordValidator as "Password can't be empty."`, () => {
    const emptyPassword = '';
    expect(passwordValidator(emptyPassword)).toBe("Password can't be empty.");
  });

  test(`Should have passwordValidator as true`, () => {
    const validPassword = 'passwordtest';
    expect(passwordValidator(validPassword)).toBe(true);
  });

  test(`Should have appIDValidator as "App ID can't be empty."`, () => {
    const emptyAppID = '';
    expect(appIDValidator(emptyAppID)).toBe("App ID can't be empty.");
  });

  test(`Should have appIDValidator as 'App ID must be a number.'`, () => {
    const invalidAppID = '%#$testttt';
    expect(appIDValidator(invalidAppID)).toBe('App ID must be a number.');
  });

  test(`Should have appIDValidator as true`, () => {
    const validAppID = '546';
    expect(appIDValidator(validAppID)).toBe(true);
  });

  test(`Should have proxyValidator as "Proxy URL can't be empty."`, () => {
    const invalidProxy = '';
    expect(proxyValidator(invalidProxy)).toBe("Proxy URL can't be empty.");
  });

  test(`Should have proxyValidator as true`, () => {
    const validProxy = 'https://example.proxy.com';
    expect(proxyValidator(validProxy)).toBe(true);
  });
});
