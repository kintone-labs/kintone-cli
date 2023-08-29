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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const jsonfile_1 = require("jsonfile");
const devCommand_1 = require("../devCommand");
const constant_1 = require("../../../constant");
const uploadConfig_test_1 = require("./uploadConfig.test");
(0, globals_1.describe)('Dev command', () => {
    (0, globals_1.describe)('Watch', () => {
        let mainProgram;
        const readLineAsyncParam = globals_1.jest.fn();
        (0, globals_1.test)('Should be "" when setting the value watch to false', () => __awaiter(void 0, void 0, void 0, function* () {
            const currentDir = yield (0, uploadConfig_test_1.devCommandInit)('Plugin');
            const config = (0, jsonfile_1.readFileSync)(`${currentDir}/config.json`);
            config.uploadConfig.desktop.css = (0, uploadConfig_test_1.dataTest)();
            config.uploadConfig.mobile.js = (0, uploadConfig_test_1.dataTest)();
            Object.assign(config.uploadConfig, {
                config: { css: (0, uploadConfig_test_1.dataTest)(), js: (0, uploadConfig_test_1.dataTest)() }
            });
            (0, jsonfile_1.writeFileSync)(`${currentDir}/config.json`, config, constant_1.WRITE_FILE_OPTIONS);
            const { webpackDevServer, commandConfig, responseMessage } = (0, uploadConfig_test_1.dataInitDevCommand)({ process, watch: false });
            try {
                yield (0, devCommand_1.devCommandHandle)({
                    ws: webpackDevServer,
                    cmd: commandConfig,
                    data: responseMessage,
                    readLineAsyncParam
                });
                (0, globals_1.expect)(mainProgram.opts().appName).toEqual('');
            }
            catch (error) {
                (0, globals_1.expect)(error).toEqual(error);
            }
        }));
    });
});
//# sourceMappingURL=watch.test.js.map