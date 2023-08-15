import { describe, expect, test } from '@jest/globals';
import {
  authJSONAddProps,
  configJSONAddProps
} from '../../../src/commands/Auth/helper';

describe('auth command: helper', () => {
  test(`Should have authJSONAddProps as cmd`, () => {
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

  test(`Should have authJSONAddProps as answer`, () => {
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

  test(`Should have configJSONAddProps as answer`, () => {
    const configJSON = {};
    const answer = {
      appID: '503'
    };

    const configJSONResult = answer;
    expect(configJSONAddProps({ configJSON, answer: answer })).toEqual(
      configJSONResult
    );
  });

  test(`Should have configJSONAddProps as cmd`, () => {
    const configJSON = {};
    const cmd = {
      appID: '503'
    };

    const configJSONResult = cmd;
    expect(configJSONAddProps({ configJSON, cmd })).toEqual(configJSONResult);
  });
});
