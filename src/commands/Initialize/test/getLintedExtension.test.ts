import { describe, expect, test } from '@jest/globals';
import { getLintedExtension } from '../generator';
import { AppOption } from '../../../dto/app';

describe('Initialize command', () => {
  describe('getLintedExtension', () => {
    test('Should be .tsx when setting useReact and useTypescript', async () => {
      const appOption = {
        useReact: true,
        useTypescript: true
      } as AppOption;
      const lintedExtension = getLintedExtension(appOption);

      expect(lintedExtension).toBe('.tsx');
    });

    test('Should be .jsx when setting useReact', async () => {
      const appOption = {
        useReact: true,
        useTypescript: false
      } as AppOption;
      const lintedExtension = getLintedExtension(appOption);

      expect(lintedExtension).toBe('.jsx');
    });

    test('Should be .ts when setting useReact and useTypescript', async () => {
      const appOption = {
        useReact: false,
        useTypescript: true
      } as AppOption;
      const lintedExtension = getLintedExtension(appOption);

      expect(lintedExtension).toBe('.ts');
    });

    test('Should be .js when setting none for useReact and useTypescript', async () => {
      const appOption = {
        useReact: false,
        useTypescript: false
      } as AppOption;
      const lintedExtension = getLintedExtension(appOption);

      expect(lintedExtension).toBe('.js');
    });
  });
});
