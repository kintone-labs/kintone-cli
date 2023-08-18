import { describe, expect, test } from '@jest/globals';
import { authJSONAddProps, configJSONAddProps } from '../helper';

describe('Auth command', () => {
  describe('Helper', () => {
    describe('authJSONAddProps', () => {
      test(`Should be equivalent to cmd`, () => {
        const authJSON = {};
        const cmd = {
          domain: 'https://domain.kintone.com',
          username: 'user',
          password: 'password',
          proxy: 'http://localhost:8080'
        };

        const authJSONResult = cmd;
        expect(authJSONAddProps({ authJSON, cmd })).toEqual(authJSONResult);
      });

      test(`Should be equivalent to answer`, () => {
        const authJSON = {};
        const answer = {
          domain: 'https://domain.kintone.com',
          username: 'user',
          password: 'password',
          proxy: 'http://localhost:8080'
        };

        const authJSONResult = answer;
        expect(authJSONAddProps({ authJSON, answer: answer })).toEqual(
          authJSONResult
        );
      });
    });

    describe('configJSONAddProps', () => {
      test(`Should be equivalent to answer`, () => {
        const configJSON = {};
        const answer = {
          appID: '503'
        };

        const configJSONResult = answer;
        expect(configJSONAddProps({ configJSON, answer: answer })).toEqual(
          configJSONResult
        );
      });

      test(`Should be equivalent to cmd`, () => {
        const configJSON = {};
        const cmd = {
          appID: '503'
        };

        const configJSONResult = cmd;
        expect(configJSONAddProps({ configJSON, cmd })).toEqual(
          configJSONResult
        );
      });
    });
  });
});
