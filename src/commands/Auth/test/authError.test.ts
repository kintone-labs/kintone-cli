import { describe, expect, test } from '@jest/globals';
import {
  appIDValidator,
  authValidator,
  domainValidator,
  passwordValidator,
  proxyValidator,
  usernameValidator
} from '../validator';

describe('Auth command', () => {
  describe('Validator', () => {
    describe('App Name', () => {
      test(`Should return 'App name missing.' when setting an empty app name`, () => {
        const invalidAppName = '';
        expect(authValidator(invalidAppName)).toBe('App name missing.');
      });
    });

    describe('Domain', () => {
      test(`Should return 'Domain has to start with https.' when setting a domain without https`, () => {
        const invalidDomain = 'domain.kintone.com';
        expect(domainValidator(invalidDomain)).toBe(
          'Domain has to start with https.'
        );
      });

      test(`Should return 'Please enter a valid domain.' when setting an invalid domain`, () => {
        const invalidDomain = 'https://%*@(&#$#).k#intone.%com';
        expect(domainValidator(invalidDomain)).toBe(
          'Please enter a valid domain.'
        );
      });

      test(`Should return true when setting a valid domain`, () => {
        const validDomain = 'https://domain.kintone.com';
        expect(domainValidator(validDomain)).toBe(true);
      });
    });

    describe('Username', () => {
      test(`Should return 'Username cannot be empty.' when setting an empty username`, () => {
        const emptyUsername = '';
        expect(usernameValidator(emptyUsername)).toBe(
          'Username cannot be empty.'
        );
      });

      test(`Should return true when setting a valid username`, () => {
        const validUsername = 'username';
        expect(usernameValidator(validUsername)).toBe(true);
      });
    });

    describe('Password', () => {
      test(`Should return 'Password cannot be empty.' when setting an empty password`, () => {
        const emptyPassword = '';
        expect(passwordValidator(emptyPassword)).toBe(
          'Password cannot be empty.'
        );
      });

      test(`Should return true when setting a valid password`, () => {
        const validPassword = 'password';
        expect(passwordValidator(validPassword)).toBe(true);
      });
    });

    describe('App ID', () => {
      test(`Should return 'App ID cannot be empty.' when setting an empty App ID`, () => {
        const emptyAppID = '';
        expect(appIDValidator(emptyAppID)).toBe('App ID cannot be empty.');
      });

      test(`Should return 'App ID must be a number.' when setting an invalid App ID`, () => {
        const invalidAppID = 'invalid app id';
        expect(appIDValidator(invalidAppID)).toBe('App ID must be a number.');
      });

      test(`Should return true when setting a valid App ID`, () => {
        const validAppID = '123';
        expect(appIDValidator(validAppID)).toBe(true);
      });
    });

    describe('Proxy URL', () => {
      test(`Should return 'Proxy URL cannot be empty.' when setting an empty Proxy URL`, () => {
        const invalidProxy = '';
        expect(proxyValidator(invalidProxy)).toBe('Proxy URL cannot be empty.');
      });

      test(`Should return true when setting a valid Proxy URL`, () => {
        const validProxy = 'https://example.proxy.com';
        expect(proxyValidator(validProxy)).toBe(true);
      });
    });
  });
});
