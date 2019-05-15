"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildEslintRcTemplate = ({ useTypescript, useReact }) => {
    const eslintRules = ["@cybozu/eslint-config/lib/kintone.js", "@cybozu/eslint-config/globals/kintone.js"];
    if (useTypescript && useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react-typescript');
    }
    else if (useTypescript) {
        eslintRules.push('@cybozu/eslint-config/presets/typescript');
    }
    else if (useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react');
    }
    let eslintRulesToString = '["' + eslintRules.join('", "') + '"]';
    return `module.exports = {
        env: {
            es6: true
        },
            extends: ${eslintRulesToString},
        }`;
};
exports.buildEslintRcTemplate = buildEslintRcTemplate;
exports.default = {
    buildEslintRcTemplate
};
