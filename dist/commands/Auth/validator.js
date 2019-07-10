"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    authValidator: (params) => {
        if (!params['appName']) {
            return 'App name missing';
        }
        return false;
    }
};
//# sourceMappingURL=validator.js.map