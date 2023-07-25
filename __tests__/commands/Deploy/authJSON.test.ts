import { program, CommanderStatic } from 'commander';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import deployCommand from '../../../src/commands/Deploy/deployCommand';
import authCommand from '../../../src/commands/Auth/authCommand';
import {
  authCommandImplement,
  createTempDir,
  createTemplate,
  createTemplateSpecificType,
  initProject,
  linkDirCustom,
  removeTempDir
} from '../../test-helpers';
import { readFileSync, writeFileSync } from 'jsonfile';
import { existsSync } from 'fs';

const PROJECT_NAME = 'test-project';
const ORIGINAL_CWD = linkDirCustom();
const TEMP_DIR = ORIGINAL_CWD + '/deployAuthJSONTemp';
const APP_NAME = 'test-app';
const OPTIONS = ['node', 'deploy', '--app-name', APP_NAME];

describe('domain', () => {
  let mainProgram: CommanderStatic;
  const CURRENT_DIR = `${TEMP_DIR}/${PROJECT_NAME}/${APP_NAME}`;

  beforeAll(async () => {
    createTempDir(TEMP_DIR);

    await initProject(TEMP_DIR, PROJECT_NAME);
    await createTemplate(TEMP_DIR, PROJECT_NAME);

    await authCommandImplement(program, process);
  });

  afterAll(() => {
    removeTempDir(TEMP_DIR);
  });

  test('Should be "https://domain.kintone.com" when assign type to "https://domain.kintone.com"', async () => {
    mainProgram = deployCommand(program);
    process.argv = OPTIONS;

    await mainProgram.parseAsync(process.argv);
    const config = readFileSync(`${CURRENT_DIR}/auth.json`);
    expect(config.domain).toBe('https://domain.kintone.com');
  });
});
