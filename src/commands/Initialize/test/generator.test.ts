import { describe, expect, test } from '@jest/globals';
import { configureCybozuLint, generateAppFolder } from '../generator';
import { AppOption } from '../../../dto/app';
import {
  createTemplateWithArgv,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { DIR_BUILD_PATH } from '../../../../unit_test/constant';

const initTestProject = async (
  handleBeforeCreateTemplate?: any,
  initProjectType: any = initProject
) => {
  const projectName = getRandomProjectName();

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

  return { projectName };
};

describe('Initialize command', () => {
  describe('configureCybozuLint', () => {
    test('Should be undefined when setting for configureCybozuLint', async () => {
      await initTestProject();
      const appOption = {
        setAuth: undefined,
        useTypescript: undefined,
        useWebpack: undefined,
        entry: undefined,
        useReact: undefined,
        appName: 'test-app',
        domain: undefined,
        username: undefined,
        password: undefined,
        type: 'Customization',
        appID: '100',
        useCybozuLint: undefined,
        scope: 'ALL',
        proxy: undefined
      } as unknown as AppOption;

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
  });

  describe('generateAppFolder', () => {
    test('Should be false when setting for generateAppFolder', async () => {
      const appOption = {
        setAuth: true,
        useTypescript: undefined,
        useWebpack: undefined,
        entry: undefined,
        useReact: undefined,
        appName: 'test-app-1',
        domain: undefined,
        username: undefined,
        password: undefined,
        type: 'Customization',
        appID: '100',
        useCybozuLint: true,
        scope: 'ALL',
        proxy: undefined
      } as unknown as AppOption;

      const lintedExtension = generateAppFolder(appOption);

      expect(lintedExtension).toBe(false);
    });

    test('Should be "App folder existed." when setting name app that is existing', async () => {
      await initTestProject();
      const appOption = {
        setAuth: true,
        useTypescript: undefined,
        useWebpack: undefined,
        entry: undefined,
        useReact: undefined,
        appName: 'test-app',
        domain: undefined,
        username: undefined,
        password: undefined,
        type: 'Customization',
        appID: '100',
        useCybozuLint: true,
        scope: 'ALL',
        proxy: undefined
      } as unknown as AppOption;

      const lintedExtension = generateAppFolder(appOption);

      expect(lintedExtension).toBe('App folder existed.');
    });
  });
});
