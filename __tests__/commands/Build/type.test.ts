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
import { readFileSync } from 'jsonfile';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/buildTypeTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'build', '--app-name', APP_NAME];

describe('type', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

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

  test('Should be "Plugin" when assign type to "Plugin"', async () => {
    const config = readFileSync(`${CURRENT_DIR}/config.json`);
    expect(config.type).toBe('Plugin');
  });
});
