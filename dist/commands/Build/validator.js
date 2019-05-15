"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
exports.default = {
    buildValidator: (params) => {
        if (!params['appName']) {
            return 'App name missing';
        }
        if (!fs_1.existsSync(params['appName'])) {
            return 'App not existed';
        }
        return false;
    }
};
//# sourceMappingURL=validator.js.map