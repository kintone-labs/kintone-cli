import { describe, expect, test } from '@jest/globals';
import { program } from 'commander';
import { existsSync } from 'fs';
import { readFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_BUILD,
  PROJECT_TYPE
} from '../../../../unit_test/constant';
import {
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';

const initTestProject = async (projectType: string) => {
  const projectName = getRandomProjectName();

  await initProject(DIR_BUILD_PATH, projectName);
  await createTemplateWithType(projectName, projectType);

  const mainProgram = buildCommand(program);
  process.argv = OPTIONS_BUILD;
  await mainProgram.parseAsync(process.argv);

  return `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;
};

describe('Build command', () => {
  describe('App type', () => {
    test('Should be "Plugin" when setting "Plugin"', async () => {
      const appDir = await initTestProject(PROJECT_TYPE.PLUGIN);
      const config = readFileSync(`${appDir}/config.json`);

      expect(config.type).toBe(PROJECT_TYPE.PLUGIN);
    });

    test('Should be "Customization" when setting "Customization"', async () => {
      const appDir = await initTestProject(PROJECT_TYPE.CUSTOMIZATION);
      const config = readFileSync(`${appDir}/config.json`);

      expect(config.type).toBe(PROJECT_TYPE.CUSTOMIZATION);
    });

    test('Should not create the project template when setting invalid type', async () => {
      const appDir = await initTestProject('invalid_type');
      const isExistFile = existsSync(`${appDir}/config.json`);

      expect(isExistFile).toBe(false);
    });

    test('Should be "Customization" when setting default type', async () => {
      const appDir = await initTestProject('');
      const config = readFileSync(`${appDir}/config.json`);

      expect(config.type).toBe(PROJECT_TYPE.CUSTOMIZATION);
    });
  });
});
