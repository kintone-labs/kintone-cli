"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEslintRcTemplate = void 0;
const buildEslintRcTemplate = ({ useTypescript, useWebpack, useReact }) => {
    const env = useTypescript || useWebpack || useReact ? 'es2017' : 'es6';
    const eslintRules = [
        '@cybozu/eslint-config/lib/kintone.js',
        '@cybozu/eslint-config/globals/kintone.js'
    ];
    if (useTypescript && useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react-typescript');
    }
    else if (useTypescript) {
        eslintRules.push('@cybozu/eslint-config/presets/typescript');
    }
    else if (useReact) {
        eslintRules.push('@cybozu/eslint-config/presets/react');
    }
    const eslintRulesToString = '["' + eslintRules.join('", "') + '"]';
    return `module.exports = {
        env: {
            ${env}: true
        },
            extends: ${eslintRulesToString},
        }`;
};
exports.buildEslintRcTemplate = buildEslintRcTemplate;
exports.default = {
    buildEslintRcTemplate
};
//# sourceMappingURL=eslintRcTemplate.js.map