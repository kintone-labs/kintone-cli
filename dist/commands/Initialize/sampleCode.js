"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsSample = `document.addEventListener('DOMContentLoaded', function() {
    kintone.events.on('app.record.index.show', function(event) {
        console.log('Hello from kintone CLI')
        
        return event;
    });
}, false);
`;
const jsxSample = `import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = () => {
    return <span>Hello from kintone CLI</span>
}


document.addEventListener('DOMContentLoaded', function() {
    kintone.events.on('app.record.index.show', function(event) {
        ReactDOM.render(<App />,kintone.app.getHeaderSpaceElement())
        
        return event;
    });
}, false);
`;
const tsSample = `document.addEventListener('DOMContentLoaded', function() {
    kintone.events.on('app.record.index.show', function(event) {
        console.log('Hello from kintone CLI')
        
        return event;
    });
}, false);
`;
const tsxSample = `import * as React from 'react'
import * as ReactDOM from 'react-dom'

const App = () => {
    return <span>Hello from kintone CLI</span>
}


document.addEventListener('DOMContentLoaded', function() {
    kintone.events.on('app.record.index.show', function(event) {
        ReactDOM.render(<App />,kintone.app.getHeaderSpaceElement())
        
        return event;
    });
}, false);
`;
const generateSample = ({ useTypescript, useReact }) => {
    if (useReact) {
        if (useTypescript) {
            return tsxSample;
        }
        else {
            return jsxSample;
        }
    }
    else {
        if (useTypescript) {
            return tsSample;
        }
        else {
            return jsSample;
        }
    }
};
exports.generateSample = generateSample;
exports.default = generateSample;
//# sourceMappingURL=sampleCode.js.map