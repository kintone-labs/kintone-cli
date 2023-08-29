const jsSampleUseStrict = `(function() {
    'use strict';
    kintone.events.on('app.record.index.show', function(event) {
        console.log('Hello from kintone CLI');
        return event;
    });
})();
`;

const jsSample = `(function() {
  kintone.events.on('app.record.index.show', function(event) {
      console.log('Hello from kintone CLI');
      return event;
  });
})();
`;

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
const tsSample = `(() => {
    kintone.events.on('app.record.index.show', event => {
        console.log('Hello from kintone CLI');
        return event;
    });
})();`;
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

const generateSample = ({ useTypescript, useReact, useWebpack }): string => {
  const env = useTypescript || useWebpack || useReact ? 'es2017' : 'es6';
  const jsSampleInit = env === 'es6' ? jsSample : jsSampleUseStrict;

  if (useReact && useTypescript) return tsxSample;
  if (useReact) return jsxSample;
  if (useTypescript) return tsSample;

  return jsSampleInit;
};
export { generateSample };
export default generateSample;
