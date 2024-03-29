"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSample = void 0;
const jsSample = `(function() {
    'use strict';
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
const generateSample = ({ useTypescript, useReact }) => {
    if (useReact) {
        if (useTypescript) {
            return tsxSample;
        }
        return jsxSample;
    }
    if (useTypescript) {
        return tsSample;
    }
    return jsSample;
};
exports.generateSample = generateSample;
exports.default = generateSample;
//# sourceMappingURL=sampleCode.js.map