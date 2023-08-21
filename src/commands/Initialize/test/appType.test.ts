import { describe, expect, test } from '@jest/globals';
import {
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
import { WRITE_FILE_OPTIONS } from '../../../constant';
import { writeFileSync } from 'jsonfile';

const initializeTestProject = async (
  argv: any,
  initProjectType: any = initProject
) => {
  const projectName = getRandomProjectName();
  await initProjectType(DIR_BUILD_PATH, projectName);
  await createTemplateWithArgv(projectName, argv);
  return projectName;
};

describe('Initialize command', () => {
  describe('App Type', () => {
    test('Should use React template when the preset is set to React', async () => {
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
      const projectName = await initializeTestProject(argv);
      const template = readFileSync(
        `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}/source/index.jsx`,
        'utf8'
      );
      const isReactTemplate = template.includes(
        "import * as React from 'react';"
      );
      expect(isReactTemplate).toBe(true);
    });

    test('Should be exist tsconfig file when the preset is set to ReactTS', async () => {
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
      const projectName = await initializeTestProject(argv);
      writeFileSync(
        `${DIR_BUILD_PATH}/${projectName}/config.json`,
        WEBPACK_CONTENT,
        WRITE_FILE_OPTIONS
      );
      const doesFileExist = existsSync(
        `${DIR_BUILD_PATH}/${projectName}/test-app/tsconfig.json`
      );

      expect(doesFileExist).toBe(true);
    });

    test('Should not be created the folder when setting an invalid scope', async () => {
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
      const projectName = await initializeTestProject(argv);
      const doesFolderExist = existsSync(
        `${DIR_BUILD_PATH}/${projectName}/test-app`
      );

      expect(doesFolderExist).toBe(false);
    });

    test('Should not be created the folder when node will be installed and setting an invalid scope', async () => {
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
      const projectName = await initializeTestProject(
        argv,
        initProjectWithInstall
      );
      const doesFolderExist = existsSync(
        `${DIR_BUILD_PATH}/${projectName}/test-app`
      );

      expect(doesFolderExist).toBe(false);
    });

    test('Should be undefined when the option is set incorrectly', async () => {
      const status = printAppDevelopmentInstructions({ setAuth: true });

      expect(status).toBe(undefined);
    });

    test('Should be the setting value same as the answer value"', async () => {
      const answer = {
        setAuth: true,
        useTypescript: true,
        useWebpack: true,
        entry: 'index.tsx',
        useReact: true,
        appName: APP_NAME,
        domain: 'domain.com',
        username: 'username',
        password: 'password',
        type: 'Customization',
        appID: '100',
        useCybozuLint: true,
        scope: 'ALL',
        proxy: null
      };
      const cmd = {};
      const setting = getAppSetting(cmd, answer);
      const isEqualValue = JSON.stringify(setting) === JSON.stringify(answer);
      expect(isEqualValue).toBe(true);
    });
  });
});
