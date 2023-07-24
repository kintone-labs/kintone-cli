import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import buildCommand from '../../../src/commands/Build/buildCommand';
import {
  createTempDir,
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

describe('Info options', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;
  const DATA_DEMO = {
    name: 'test',
    description: 'This is unit test',
    version: '1.0.0'
  };

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplatePluginType(TEMP_DIR, PROJECT_NAME);

    mainProgram = buildCommand(program);
    process.argv = OPTIONS;

    writeFileSync(`${CURRENT_DIR}/auth.json`, DECLARE_KINTONE);
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    Object.assign(config.uploadConfig, DATA_DEMO);
    writeFileSync(`${CURRENT_DIR}/config.json`, config, WRITE_FILE_OPTIONS);

    await mainProgram.parseAsync(process.argv);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test(`Should be ${DATA_DEMO} when assign to ${DATA_DEMO}`, async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    const result = {
      name: config.uploadConfig.name,
      description: config.uploadConfig.description,
      version: config.uploadConfig.version
    };
    expect(result).toEqual(DATA_DEMO);
  });
});
