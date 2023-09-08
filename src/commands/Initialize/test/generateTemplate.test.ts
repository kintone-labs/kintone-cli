import { describe, expect, test } from '@jest/globals';
import generateSample from '../sampleCode';

describe('Initialize command', () => {
  describe('Generate template', () => {
    test('Should be JSX template when using React', async () => {
      const jsxSample = `
        import * as React from 'react'
        import * as ReactDOM from 'react-dom'

        const App = () => {
          return <span>Hello from kintone CLI</span>
        }
        (() => {
          kintone.events.on('app.record.index.show', event => {
            const container = document.createElement('div');
            kintone.app.getHeaderSpaceElement().append(container);
            ReactDOM.render(<App />, container)
            return event;
          });
        })();
      `;
      const template = generateSample({
        useTypescript: false,
        useReact: true,
        useWebpack: false
      }) as string;

      const templateWithoutSpaces = template.replace(/\s+/g, '');
      const jsxSampleWithoutSpaces = jsxSample.replace(/\s+/g, '');

      expect(templateWithoutSpaces.includes(jsxSampleWithoutSpaces)).toBe(true);
    });

    test('Should be TSX template when using React and TypeScript', async () => {
      const tsxSample = `
        import * as React from 'react';
        import * as ReactDOM from 'react-dom';

        const App = () => {
          return <span>Hello from kintone CLI</span>;
        };

        (() => {
          kintone.events.on('app.record.index.show', event => {
            const container = document.createElement('div');
            kintone.app.getHeaderSpaceElement().append(container);
            ReactDOM.render(<App />, container);
            return event;
          });
        })();
      `;
      const template = generateSample({
        useTypescript: true,
        useReact: true,
        useWebpack: false
      }) as string;

      const templateWithoutSpaces = template.replace(/\s+/g, '');
      const tsxSampleWithoutSpaces = tsxSample.replace(/\s+/g, '');

      expect(templateWithoutSpaces.includes(tsxSampleWithoutSpaces)).toBe(true);
    });

    test('Should be TS template when not using React but using TypeScript', async () => {
      const tsSample = `
        (() => {
          kintone.events.on('app.record.index.show', event => {
            console.log('Hello from kintone CLI');
            return event;
          });
        })();
      `;
      const template = generateSample({
        useTypescript: true,
        useReact: false,
        useWebpack: false
      }) as string;

      const templateWithoutSpaces = template.replace(/\s+/g, '');
      const tsSampleWithoutSpaces = tsSample.replace(/\s+/g, '');

      expect(templateWithoutSpaces.includes(tsSampleWithoutSpaces)).toBe(true);
    });

    test('Should be JS sample when neither React nor TypeScript is used', async () => {
      const jsSample = `
        (function() {
          kintone.events.on('app.record.index.show', function(event) {
            console.log('Hello from kintone CLI');
            return event;
          });
        })();
      `;
      const template = generateSample({
        useTypescript: false,
        useReact: false,
        useWebpack: false
      }) as string;
      const templateWithoutSpaces = template.replace(/\s+/g, '');
      const jsSampleWithoutSpaces = jsSample.replace(/\s+/g, '');
      expect(templateWithoutSpaces.includes(jsSampleWithoutSpaces)).toBe(false);
    });
  });
});
