import { describe, expect, test } from '@jest/globals';
import generateSample from '../sampleCode';

describe('Initialize command', () => {
  describe('validator', () => {
    test('Should be true when setting useReact', async () => {
      const params = {
        useTypescript: false,
        useReact: true
      };
      const jsxSample = `import * as React from 'react'
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
})();`;
      const generateSampleInit = generateSample(params) as string;

      expect(generateSampleInit.includes(jsxSample)).toBe(true);
    });

    test('Should be true when setting useReact and useTypescript', async () => {
      const params = {
        useTypescript: true,
        useReact: true
      };
      const tsxSample = `import * as React from 'react';
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
      const generateSampleInit = generateSample(params) as string;

      expect(generateSampleInit.includes(tsxSample)).toBe(true);
    });

    test('Should be true when setting none useReact and useTypescript', async () => {
      const params = {
        useTypescript: true,
        useReact: false
      };
      const tsSample = `(() => {
    kintone.events.on('app.record.index.show', event => {
        console.log('Hello from kintone CLI');
        return event;
    });
})();`;
      const generateSampleInit = generateSample(params) as string;

      expect(generateSampleInit.includes(tsSample)).toBe(true);
    });

    test('Should be true when setting none useReact and none useTypescript', async () => {
      const params = {
        useTypescript: false,
        useReact: false
      };
      const jsSample = `(function() {
    'use strict';
    kintone.events.on('app.record.index.show', function(event) {
        console.log('Hello from kintone CLI');
        return event;
    });
})();
`;
      const generateSampleInit = generateSample(params) as string;

      expect(generateSampleInit.includes(jsSample)).toBe(true);
    });
  });
});
