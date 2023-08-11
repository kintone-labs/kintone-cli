import { describe, expect, test } from '@jest/globals';
import { getLintedExtension } from '../generator';
import { AppOption } from '../../../dto/app';

describe('Initialize command', () => {
  const appOption = {
    useReact: true,
    useTypescript: true
  } as AppOption;

  describe('Lint Extension', () => {
    test('Should be .tsx when use React and use TypeScript', async () => {
      const extension = getLintedExtension(appOption);

      expect(extension).toBe('.tsx');
    });

    test('Should be .jsx when use React and do not use TypeScript', async () => {
      appOption.useTypescript = false;
      const extension = getLintedExtension(appOption);

      expect(extension).toBe('.jsx');
    });

    test('Should be .ts when do not use React and use TypeScript', async () => {
      appOption.useReact = false;
      appOption.useTypescript = true;
      const extension = getLintedExtension(appOption);

      expect(extension).toBe('.ts');
    });

    test('Should be .js when do not use React and do not use TypeScript', async () => {
      appOption.useReact = false;
      appOption.useTypescript = false;
      const extension = getLintedExtension(appOption);

      expect(extension).toBe('.js');
    });
  });
});
