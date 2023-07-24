import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import buildCommand from '../../../src/commands/Build/buildCommand';
import {
  createTempDir,
  createTemplate,
  createTemplatePluginType,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';
import { DECLARE_KINTONE, WRITE_FILE_OPTIONS } from '../../../src/constant';
import { readFileSync, writeFileSync } from 'jsonfile';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildOptionsTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];

describe('auth command: options', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have domain as "https://domain.kintone.com"', async () => {
    expect(mainProgram.opts().domain).toBe(undefined);
  });
});

describe('build command: options', () => {
  let mainProgram: CommanderStatic;
  const OPTIONS_MISS_NAME = ['node', 'build', '--app-name', ''];

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS_MISS_NAME;

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have domain as "https://domain.kintone.com"', async () => {
    expect(mainProgram.opts().domain).toBe(undefined);
  });
});

describe('build command: options', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/webpack.config.js`, DECLARE_KINTONE);
    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have domain as "https://domain.kintone.com"', async () => {
    expect(mainProgram.opts().domain).toBe(undefined);
  });
});

describe('build command: options', () => {
  let mainProgram: CommanderStatic;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplatePluginType(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have domain as "https://domain.kintone.com"', async () => {
    expect(mainProgram.opts().domain).toBe(undefined);
  });
});

describe('build command: options', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplatePluginType(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    config.uploadConfig.name = 'test';
    config.uploadConfig.description = 'This is unit test';
    config.uploadConfig.version = '1.0.0';
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('should have domain as "https://domain.kintone.com"', async () => {
    expect(mainProgram.opts().domain).toBe(undefined);
  });
});
