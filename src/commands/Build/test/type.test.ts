import { beforeAll, describe, expect, test } from '@jest/globals';
import { Command, program } from 'commander';
import { existsSync } from 'fs';
import { readFileSync } from 'jsonfile';
import {
  APP_NAME,
  DIR_BUILD_PATH,
  OPTIONS_BUILD,
  PROJECT_TYPE
} from '../../../../unit_test/constant';
import {
  createBuildDir,
  createTemplateWithType,
  getRandomProjectName,
  initProject
} from '../../../../unit_test/helper';
import buildCommand from '../buildCommand';

describe('build command', () => {
  describe('type: "Plugin"', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplateWithType(projectName, PROJECT_TYPE.PLUGIN);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "Plugin" when setting "Plugin"', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      expect(config.type).toBe(PROJECT_TYPE.PLUGIN);
    });
  });

  describe('type: "Customization"', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplateWithType(projectName, PROJECT_TYPE.CUSTOMIZATION);

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "Customization" when setting "Customization"', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      expect(config.type).toBe(PROJECT_TYPE.CUSTOMIZATION);
    });
  });

  describe('type: Invalid', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplateWithType(projectName, 'invalid_type');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      await mainProgram.parseAsync(process.argv);
    });

    test('Should not create the project template', () => {
      const isExistFile = existsSync(`${CURRENT_DIR}/config.json`);
      expect(isExistFile).toBe(false);
    });
  });

  describe('Type: default', () => {
    let mainProgram: Command;
    const projectName = getRandomProjectName();
    const CURRENT_DIR = `${DIR_BUILD_PATH}/${projectName}/${APP_NAME}`;

    beforeAll(async () => {
      createBuildDir(DIR_BUILD_PATH);

      await initProject(DIR_BUILD_PATH, projectName);
      await createTemplateWithType(projectName, '');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS_BUILD;

      await mainProgram.parseAsync(process.argv);
    });

    test('Should be "Customization" when setting ""', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      expect(config.type).toBe(PROJECT_TYPE.CUSTOMIZATION);
    });
  });
});
