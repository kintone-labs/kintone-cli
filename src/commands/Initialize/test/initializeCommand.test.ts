import { describe, expect, test } from '@jest/globals';
import validator from '../validator';
import {
  authCommandImplement,
  createTemplateWithArgv,
  getRandomProjectName,
  initProject,
  initProjectWithInstall
} from '../../../../unit_test/helper';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  WEBPACK_CONTENT
} from '../../../../unit_test/constant';
import { existsSync, readFileSync, unlinkSync } from 'fs';
import {
  getAppSetting,
  printAppDevelopmentInstructions
} from '../initializeCommand';
import { program } from 'commander';
import { WRITE_FILE_OPTIONS } from '../../../constant';
import { writeFileSync } from 'jsonfile';

const initTestProject = async (
  argv: any,
  handleBeforeCreateTemplate?: any,
  initProjectType: any = initProject
) => {
  const projectName = getRandomProjectName();

  await initProjectType(DIR_BUILD_PATH, projectName);
  handleBeforeCreateTemplate && handleBeforeCreateTemplate(projectName);
  await createTemplateWithArgv(projectName, argv);

  return { projectName };
};

describe('Initialize command', () => {
  describe('validator', () => {
    test('Should be true when setting quick', async () => {
      const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--app-name',
        'test-app',
        '--app-id',
        '100'
      ];
      await initTestProject(argv);
      const params = {
        type: 'testType'
      };
      const appValidator = validator.appValidator(params) as string;

      expect(appValidator.includes('Invalid App Type')).toBe(true);
    });

    test('Should be false when setting none package.json', async () => {
      const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--app-name',
        APP_NAME
      ];
      const removePackage = (projectName) =>
        unlinkSync(`${DIR_BUILD_PATH}/${projectName}/package.json`);
      const initTest = await initTestProject(argv, removePackage);
      const isExistFolder = existsSync(
        `${DIR_BUILD_PATH}/${initTest.projectName}/package.json`
      );

      expect(isExistFolder).toBe(false);
    });

    test('Should be true when setting preset is React', async () => {
      const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--app-name',
        APP_NAME,
        '--preset',
        'React',
        '--type',
        'Plugin'
      ];
      const initTest = await initTestProject(argv);
      const config = readFileSync(
        `${DIR_BUILD_PATH}/${initTest.projectName}/${APP_NAME}/source/index.jsx`,
        'utf8'
      );

      expect(config.includes("import * as React from 'react';")).toBe(true);
    });

    test('Should be true when setting preset is ReactTS', async () => {
      const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--app-name',
        APP_NAME,
        '--preset',
        'ReactTS'
      ];
      const initTest = await initTestProject(argv);

      writeFileSync(
        `${DIR_BUILD_PATH}/${initTest.projectName}/config.json`,
        WEBPACK_CONTENT,
        WRITE_FILE_OPTIONS
      );
      await authCommandImplement(program, process);

      const isExistFolder = existsSync(
        `${DIR_BUILD_PATH}/${initTest.projectName}/test-app/tsconfig.json`
      );

      expect(isExistFolder).toBe(true);
    });

    test('Should be false when setting false for appValidator', async () => {
      const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--preset',
        'React',
        '--type',
        'Customization',
        '--scope',
        'testScope'
      ];
      const initTest = await initTestProject(argv);
      const isExistFolder = existsSync(
        `${DIR_BUILD_PATH}/${initTest.projectName}/test-app`
      );

      expect(isExistFolder).toBe(false);
    });

    test('Should be false when setting install', async () => {
      const argv = [
        'node',
        'dist',
        'create-template',
        '--quick',
        '--preset',
        'React',
        '--type',
        'Customization',
        '--scope',
        'testScope'
      ];
      const initTest = await initTestProject(
        argv,
        null,
        initProjectWithInstall
      );
      const isExistFolder = existsSync(
        `${DIR_BUILD_PATH}/${initTest.projectName}/test-app`
      );

      expect(isExistFolder).toBe(false);
    });

    test('Should be undefined when setting false for appSetting', async () => {
      const appSetting = {
        setAuth: true
      };
      const checkAppStatus = printAppDevelopmentInstructions(appSetting);

      expect(checkAppStatus).toBe(undefined);
    });

    test('Should be true when setting answer', async () => {
      const answer = {
        setAuth: true,
        useTypescript: true,
        useWebpack: true,
        entry: 'index.tsx',
        useReact: true,
        appName: 'test-app',
        domain: 'domain.com',
        username: 'username',
        password: 'password',
        type: 'Customization',
        appID: '100',
        useCybozuLint: 'lintExample',
        scope: 'ALL',
        proxy: null
      };

      const cmd = {};

      const appSetting = getAppSetting(cmd, answer);

      expect(JSON.stringify(appSetting) === JSON.stringify(answer)).toEqual(
        true
      );
    });

    test('Should be true when setting answer', async () => {
      const answer = {
        setAuth: 'auth',
        useTypescript: true,
        useWebpack: true,
        entry: 'index.tsx',
        useReact: true,
        appName: 'test-app',
        domain: 'domain.com',
        username: 'username',
        password: 'password',
        type: 'Customization',
        appID: '100',
        useCybozuLint: 'lintExample',
        scope: 'ALL',
        proxy: null
      };

      const cmd = {};

      const appSetting = getAppSetting(cmd, answer);

      expect(JSON.stringify(appSetting) === JSON.stringify(answer)).toEqual(
        true
      );
    });
  });
});
