import { describe, expect, test } from '@jest/globals';
import { configureCybozuLint } from '../generator';
import { AppOption } from '../../../dto/app';
import {
  createTemplateWithArgv,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';
import { readFileSync } from 'jsonfile';

const initializeTestProject = async (initProjectType: any = initProject) => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}`;
  await initProjectType(DIR_BUILD_PATH, projectName);
  const argv = [
    'node',
    'dist',
    'create-template',
    '--quick',
    '--app-name',
    APP_NAME,
    '--app-id',
    '100'
  ];
  await createTemplateWithArgv(projectName, argv);

  return { projectName, currentDir };
};

describe('Initialize command', () => {
  const appOption = {
    appName: APP_NAME,
    type: 'Customization',
    appID: '100',
    scope: 'ALL'
  } as unknown as AppOption;

  describe('Cybozu lint', () => {
    test('Should be undefined when Cybozu Lint is not used', async () => {
      await initializeTestProject();
      const packageJSON = {
        name: APP_NAME,
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
          '@kintone/plugin-uploader': '9.1.1'
        },
        scripts: {
          dev: 'ws'
        }
      };
      const cybozuLint = configureCybozuLint(appOption, packageJSON);

      expect(cybozuLint).toBe(undefined);
    });

    test('Should be true when Cybozu Lint is used', async () => {
      const initTest = await initializeTestProject();
      appOption.useCybozuLint = true;
      const packageJSON = {
        name: APP_NAME,
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
      const packageInstalled = readFileSync(
        `${initTest.currentDir}/package.json`
      );
      const isCybozuLintInstalled =
        '@cybozu/eslint-config' in packageInstalled.devDependencies;

      expect(isCybozuLintInstalled).toBe(true);
    });
  });
});
