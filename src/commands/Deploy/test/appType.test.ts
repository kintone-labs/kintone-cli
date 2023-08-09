import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { existsSync } from 'fs';
import { readFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  PROJECT_TYPE,
  OPTIONS_DEPLOY
} from '../../../../unit_test/constant';
import {
  authCommandImplement,
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import deployCommand from '../deployCommand';

const initTestProject = async (projectType: string) => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, projectType);

  const isProjectTypeValid = Object.values(PROJECT_TYPE).includes(projectType);
  if (isProjectTypeValid || projectType === '') {
    await authCommandImplement(program, process);
  }

  return currentDir;
};

describe('Deploy command', () => {
  describe('Type', () => {
    test('Should be "Plugin" when assign to "Plugin"', async () => {
      const currentDir = await initTestProject('Plugin');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;

      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${currentDir}/config.json`);

      expect(config.type).toBe('Plugin');
    });

    test('Should be "Customization" when assign to "Customization"', async () => {
      const current_dir = await initTestProject('Customization');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;

      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${current_dir}/config.json`);

      expect(config.type).toBe('Customization');
    });

    test('Should be false when assign to invalid type', async () => {
      const currentDir = await initTestProject('invalid_type');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;

      await mainProgram.parseAsync(process.argv);
      const isExistFile = existsSync(`${currentDir}/config.json`);

      expect(isExistFile).toBe(false);
    });

    test('Should be "Customization" when assign type to default type', async () => {
      const currentDir = await initTestProject('');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;

      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${currentDir}/config.json`);

      expect(config.type).toBe('Customization');
    });
  });
});
