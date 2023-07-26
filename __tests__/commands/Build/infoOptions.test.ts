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
import { DECLARE_KINTONE, WRITE_FILE_OPTIONS } from '../../../src/constant';
import { readFileSync, writeFileSync } from 'jsonfile';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildOptionsTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];
const { afterAll, beforeAll, describe, expect, test } = jestCommon;

describe('build command', () => {
  describe('Info options: name', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        name: 'package test'
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "package test" when assign to "package test"', async () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        name: config.uploadConfig.name,
        description: config.uploadConfig.description,
        version: config.uploadConfig.version
      };
      expect(result).toEqual({
        name: 'package test'
      });
    });
  });

  describe('Info options: name empty', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        name: ''
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "" when assign to ""', async () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        name: config.uploadConfig.name
      };
      expect(result).toEqual({
        name: ''
      });
    });
  });

  describe('Info options: description', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        description: 'metadata about this project'
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "metadata about this project" when assign to "metadata about this project"', async () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        description: config.uploadConfig.description
      };
      expect(result).toEqual({
        description: 'metadata about this project'
      });
    });
  });

  describe('Info options: description empty', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        description: ''
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "" when assign to ""', async () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        description: config.uploadConfig.description
      };
      expect(result).toEqual({
        description: ''
      });
    });
  });

  describe('Info options: version', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        version: '1.0.0'
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "1.0.0" when assign to "1.0.0"', async () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        version: config.uploadConfig.version
      };
      expect(result).toEqual({
        version: '1.0.0'
      });
    });
  });

  describe('Info options: version empty', () => {
    let mainProgram: Command;
    const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

    beforeAll(async () => {
      createTempDir(TEMP_DIR);

      await initProject(TEMP_DIR, PROJECT_NAME);
      await createTemplateSpecificType(TEMP_DIR, PROJECT_NAME, 'Plugin');

      mainProgram = buildCommand(program);
      process.argv = OPTIONS;

      writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      Object.assign(config.uploadConfig, {
        version: ''
      });
      writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

      await mainProgram.parseAsync(process.argv);
    });

    afterAll(() => {
      removeTempDir(TEMP_DIR);
    });

    test('Should be "" when assign to ""', async () => {
      const config = readFileSync(`${CURRENT_DIR}/config.json`);
      const result = {
        version: config.uploadConfig.version
      };
      expect(result).toEqual({
        version: ''
      });
    });
  });
});
