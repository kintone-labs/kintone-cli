"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    'use strict';
    kintone.events.on('app.record.index.show', event => {
        ReactDOM.render(<App />,kintone.app.getHeaderSpaceElement())
        
        return event;
    });
})();`;
const tsSample = `(() => {
    'use strict';
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
        'use strict';
        ReactDOM.render(<App />, kintone.app.getHeaderSpaceElement());
    
        return event;
    });
})();
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