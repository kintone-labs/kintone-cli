import { program, Command } from 'commander';
import buildCommand from '../../../src/commands/Build/buildCommand';
import {
  createTempDir,
  createTemplateSpecificType,
  initProject,
  jestCommon,
  linkDirCustom,
  removeTempDir
} from '../../utils';
import { readFileSync } from 'jsonfile';
import { existsSync } from 'fs';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildTypeTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];
const { afterAll, beforeAll, describe, expect, test } = jestCommon;

describe('build command', () => {
  describe('type: "Plugin"', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "Plugin" when assign type to "Plugin"', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      expect(config.type).toBe('Plugin');
    });
  });

  describe('type: "Customization"', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Customization');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "Customization" when assign type to "Customization"', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      expect(config.type).toBe('Customization');
    });
  });

  describe('type: "another_&^#_2"', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'another_&^#_2');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be false when assign type to "another_&^#_2"', () => {
      const isExistFile = existsSync(`${CURRENT_DIR}/config.json`);
      expect(isExistFile).toBe(false);
    });
  });

  describe('type: ""', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, '');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "Customization" when assign type to ""', () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      expect(config.type).toBe('Customization');
    });
  });
});
