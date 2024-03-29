import { describe, expect, test } from '@jest/globals';
import { getLintedExtension } from '../generator';
import { AppOption } from '../../../dto/app';

describe('Initialize command', () => {
  const appOption = { useReact: true, useTypescript: true } as AppOption;

  describe('Lint extension', () => {
    test('Should be .tsx when using React and TypeScript', async () => {
      const fileExtension = getLintedExtension(appOption);

      expect(fileExtension).toBe('.tsx');
    });

    test('Should be .jsx when using React but not using TypeScript', async () => {
      appOption.useTypescript = false;
      const fileExtension = getLintedExtension(appOption);

      expect(fileExtension).toBe('.jsx');
    });

    test('Should be .ts when not using React but using TypeScript', async () => {
      appOption.useReact = false;
      appOption.useTypescript = true;
      const fileExtension = getLintedExtension(appOption);

      expect(fileExtension).toBe('.ts');
    });

    test('Should be .js when neither React nor TypeScript is used', async () => {
      appOption.useReact = false;
      appOption.useTypescript = false;
      const fileExtension = getLintedExtension(appOption);

      expect(fileExtension).toBe('.js');
    });
  });
});
