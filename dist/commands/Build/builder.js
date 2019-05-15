"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const buildUsingWebpack = (option) => {
    child_process_1.spawnSync('npm', ['run', `build-${option['appName']}`], { stdio: 'inherit' });
};
exports.buildUsingWebpack = buildUsingWebpack;
const buildVanillaJS = (option) => {
};
exports.buildVanillaJS = buildVanillaJS;
const builder = {
    buildUsingWebpack: buildUsingWebpack,
    buildVanillaJS: buildVanillaJS
};
exports.default = builder;
//# sourceMappingURL=builder.js.map