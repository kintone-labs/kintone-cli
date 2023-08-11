import { describe, expect, test } from '@jest/globals';
import { configureCybozuLint, generateAppFolder } from '../generator';
import { AppOption } from '../../../dto/app';
import {
  createTemplateWithArgv,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { DIR_BUILD_PATH } from '../../../../unit_test/constant';
import { readFileSync } from 'jsonfile';

const initTestProject = async (
  handleBeforeCreateTemplate?: any,
  initProjectType: any = initProject
) => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}`;

  await initProjectType(DIR_BUILD_PATH, projectName);
  handleBeforeCreateTemplate && handleBeforeCreateTemplate(projectName);
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
  await createTemplateWithArgv(projectName, argv);

  return { projectName, currentDir };
};

describe('Initialize command', () => {
  const appOption = {
    appName: 'test-app',
    type: 'Customization',
    appID: '100',
    scope: 'ALL'
  } as unknown as AppOption;

  describe('Cybozu Lint', () => {
    test('Should be undefined when do not use Cybozu Lint', async () => {
      await initTestProject();

      const packageJSON = {
        name: 'ot4uyuk6vy',
        version: '1.0.0',
        description: 'kintone customization project',
        author: '',
        license: 'MIT',
        dependencies: {
          '@kintone/kintone-ui-component': '^0.9.4',
          '@kintone/rest-api-client': '^4.0.3'
        },
        devDependencies: {
          'local-web-server': '^2.6.1',
          '@kintone/plugin-packer': '^7.0.4',
          '@kintone/plugin-uploader': '8.0.0'
        },
        scripts: {
          dev: 'ws'
        }
      };

      const lintedExtension = configureCybozuLint(appOption, packageJSON);

      expect(lintedExtension).toBe(undefined);
    });
    test('Should be true when do not use Cybozu Lint', async () => {
      const initTest = await initTestProject();

      appOption.useCybozuLint = true;

      const packageJSON = {
        name: 'test-app',
        version: '1.0.0',
        description: 'kintone customization project',
        author: '',
        license: 'MIT',
        dependencies: {
          '@kintone/kintone-ui-component': '^0.9.4'
        },
        devDependencies: {
          'local-web-server': '^2.6.1'
        },
        scripts: {
          dev: 'ws'
        }
      };

      configureCybozuLint(appOption, packageJSON);
      const packageInit = readFileSync(`${initTest.currentDir}/package.json`);
      const isCybozuLintExist =
        '@cybozu/eslint-config' in packageInit.devDependencies;

      expect(isCybozuLintExist).toBe(true);
    });
  });

  describe('App Folder', () => {
    test('Should be create folder when setting app option correct', async () => {
      await initTestProject();
      appOption.setAuth = true;
      appOption.appName = 'test-app-1';
      appOption.useCybozuLint = true;

      const isCreateSuccess = generateAppFolder(appOption);

      expect(isCreateSuccess).toBe(false);
    });

    test('Should be "App folder existed." when setting name app is exist', async () => {
      appOption.useCybozuLint = true;
      appOption.appName = 'test-app-1';

      const errorMessage = generateAppFolder(appOption);

      expect(errorMessage).toBe('App folder existed.');
    });
  });
});
