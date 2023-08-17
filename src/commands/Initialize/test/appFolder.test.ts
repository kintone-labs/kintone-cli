import { describe, expect, test } from '@jest/globals';
import { generateAppFolder } from '../generator';
import { AppOption } from '../../../dto/app';
import {
  createTemplateWithArgv,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import { APP_NAME, DIR_BUILD_PATH } from '../../../../unit_test/constant';

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

  describe('App Folder', () => {
    test('Should create a folder when the app option is set correctly', async () => {
      await initializeTestProject();
      appOption.setAuth = true;
      appOption.appName = 'test-app-1';
      appOption.useCybozuLint = true;
      const creationSuccessful = generateAppFolder(appOption);

      expect(creationSuccessful).toBe(false);
    });

    test('Should display "App folder existed." when the app name already exists', async () => {
      appOption.useCybozuLint = true;
      appOption.appName = 'test-app-1';
      const errorMessage = generateAppFolder(appOption);

      expect(errorMessage).toBe('App folder existed.');
    });
  });
});
