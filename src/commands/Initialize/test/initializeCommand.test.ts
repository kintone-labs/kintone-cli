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
import { existsSync, readFileSync } from 'fs';
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

  return projectName;
};

describe('Initialize command', () => {
  describe('Validator App Type', () => {
    test('Should be "Invalid App Type" when setting quick option', async () => {
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
      const params = { type: 'invalid type' };
      const errorMessage = validator.appValidator(params) as string;

      expect(errorMessage).toEqual('Invalid App Type');
    });

    test('Should be use React in template file when setting preset is React', async () => {
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
      const projectName = await initTestProject(argv);
      const templateFile = readFileSync(
        `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}/source/index.jsx`,
        'utf8'
      );

      expect(templateFile.includes("import * as React from 'react';")).toBe(
        true
      );
    });

    test('Should be exist tsconfig file when setting preset is ReactTS', async () => {
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
      const projectName = await initTestProject(argv);

      writeFileSync(
        `${DIR_BUILD_PATH}/${projectName}/config.json`,
        WEBPACK_CONTENT,
        WRITE_FILE_OPTIONS
      );
      await authCommandImplement(program, process);

      const isExistFile = existsSync(
        `${DIR_BUILD_PATH}/${projectName}/test-app/tsconfig.json`
      );

      expect(isExistFile).toBe(true);
    });

    test('Should do not create folder when setting invalid scope', async () => {
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
        'invalid scope'
      ];
      const projectName = await initTestProject(argv);
      const isExistFolder = existsSync(
        `${DIR_BUILD_PATH}/${projectName}/test-app`
      );

      expect(isExistFolder).toBe(false);
    });

    test('Should do not create folder when setting install option', async () => {
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
      const projectName = await initTestProject(
        argv,
        null,
        initProjectWithInstall
      );
      const isExistFolder = existsSync(
        `${DIR_BUILD_PATH}/${projectName}/test-app`
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

    test('App setting should be the same as the answer value', async () => {
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
  });
});
