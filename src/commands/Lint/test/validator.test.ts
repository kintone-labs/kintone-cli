import { describe, expect, test } from '@jest/globals';
import { APP_NAME } from '../../../../unit_test/constant';
import { rmSync } from 'fs';
import validator from '../validator';
import { initializeTestProject } from './appName.test';

describe('Lint command', () => {
  describe('Validator', () => {
    test('Should display the message "App name missing" when the app name is set to be empty', async () => {
      const initTest = await initializeTestProject();
      process.argv = ['node', 'lint', '--app-name', ''];
      const params = {};

      await initTest.mainProgram.parseAsync(process.argv);
      const isValidAppName = validator.lintValidator(params);

      expect(isValidAppName).toEqual('App name missing');
    });

    test('Should display the message "App not existed" when setting app name does not exist', async () => {
      const initTest = await initializeTestProject();
      process.argv = ['node', 'lint', '--fix', '--app-name', 'test-app'];
      rmSync(initTest.currentDir, { recursive: true, force: true });
      const params = { appName: APP_NAME };

      await initTest.mainProgram.parseAsync(process.argv);

      process.argv = ['node', 'lint', '--app-name', 'test-app'];
      const isValidAppName = validator.lintValidator(params);

      expect(isValidAppName).toEqual('App not existed');
    });
  });
});
