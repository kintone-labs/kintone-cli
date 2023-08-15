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

const initializeTestProject = async (projectType: string) => {
  const projectName = getRandomProjectName();
  const currentDir = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, projectType);

  const isValidProjectType = Object.values(PROJECT_TYPE).includes(projectType);
  if (isValidProjectType || projectType === '') {
    await authCommandImplement(program, process);
  }

  return currentDir;
};

describe('Deploy command', () => {
  describe('App type', () => {
    test('Should be "Plugin" when the project is set to "Plugin"', async () => {
      const currentDir = await initializeTestProject('Plugin');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;
      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${currentDir}/config.json`);

      expect(config.type).toBe('Plugin');
    });

    test('Should be "Customization" when the project is set to "Customization"', async () => {
      const currentDir = await initializeTestProject('Customization');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;
      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${currentDir}/config.json`);

      expect(config.type).toBe('Customization');
    });

    test('Should not be deployed when project is set to invalid', async () => {
      const currentDir = await initializeTestProject('invalid_type');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;
      await mainProgram.parseAsync(process.argv);
      const isExistFile = existsSync(`${currentDir}/config.json`);

      expect(isExistFile).toBe(false);
    });

    test('Should be "Customization" when the project is set to default', async () => {
      const currentDir = await initializeTestProject('');
      const mainProgram = deployCommand(program);
      process.argv = OPTIONS_DEPLOY;
      await mainProgram.parseAsync(process.argv);
      const config = readFileSync(`${currentDir}/config.json`);

      expect(config.type).toBe('Customization');
    });
  });
});
