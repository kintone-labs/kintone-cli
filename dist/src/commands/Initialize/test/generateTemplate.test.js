"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const sampleCode_1 = __importDefault(require("../sampleCode"));
(0, globals_1.describe)('Initialize command', () => {
    (0, globals_1.describe)('Generate template', () => {
        (0, globals_1.test)('Should be JSX template when using React', () => __awaiter(void 0, void 0, void 0, function* () {
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
            const template = (0, sampleCode_1.default)({
                useTypescript: false,
                useReact: true,
                useWebpack: false
            });
            const templateWithoutSpaces = template.replace(/\s+/g, '');
            const jsxSampleWithoutSpaces = jsxSample.replace(/\s+/g, '');
            (0, globals_1.expect)(templateWithoutSpaces.includes(jsxSampleWithoutSpaces)).toBe(true);
        }));
        (0, globals_1.test)('Should be TSX template when using React and TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
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
            const template = (0, sampleCode_1.default)({
                useTypescript: true,
                useReact: true,
                useWebpack: false
            });
            const templateWithoutSpaces = template.replace(/\s+/g, '');
            const tsxSampleWithoutSpaces = tsxSample.replace(/\s+/g, '');
            (0, globals_1.expect)(templateWithoutSpaces.includes(tsxSampleWithoutSpaces)).toBe(true);
        }));
        (0, globals_1.test)('Should be TS template when not using React but using TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
            const tsSample = `
        (() => {
          kintone.events.on('app.record.index.show', event => {
            console.log('Hello from kintone CLI');
            return event;
          });
        })();
      `;
            const template = (0, sampleCode_1.default)({
                useTypescript: true,
                useReact: false,
                useWebpack: false
            });
            const templateWithoutSpaces = template.replace(/\s+/g, '');
            const tsSampleWithoutSpaces = tsSample.replace(/\s+/g, '');
            (0, globals_1.expect)(templateWithoutSpaces.includes(tsSampleWithoutSpaces)).toBe(true);
        }));
        (0, globals_1.test)('Should be JS sample when neither React nor TypeScript is used', () => __awaiter(void 0, void 0, void 0, function* () {
            const jsSample = `
        (function() {
          kintone.events.on('app.record.index.show', function(event) {
            console.log('Hello from kintone CLI');
            return event;
          });
        })();
      `;
            const template = (0, sampleCode_1.default)({
                useTypescript: false,
                useReact: false,
                useWebpack: false
            });
            const templateWithoutSpaces = template.replace(/\s+/g, '');
            const jsSampleWithoutSpaces = jsSample.replace(/\s+/g, '');
            (0, globals_1.expect)(templateWithoutSpaces.includes(jsSampleWithoutSpaces)).toBe(true);
        }));
    });
});
//# sourceMappingURL=generateTemplate.test.js.map