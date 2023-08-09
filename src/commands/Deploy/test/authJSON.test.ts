import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { readFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_DEPLOY
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplate,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const initTestProject = async () => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplate(DIR_BUILD_PATH, projectName);
  await authCommandImplement(program, process);

  return currentDir;
};

describe('Deploy Command', () => {
  describe('domain', () => {
    test('Should be "https://domain.kintone.com" when assign to "https://domain.kintone.com"', async () => {
      const currentDir = await initTestProject();

      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;
      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${currentDir}/auth.json`);

      expect(config.domain).toBe('https://domain.kintone.com');
    });
  });
});
