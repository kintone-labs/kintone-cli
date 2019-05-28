"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url = require("url");
exports.default = {
    appValidator: (params) => {
        if (params['type'] && params['type'] !== 'Customization' && params['type'] !== 'Plugin') {
            return 'Invalid App Type';
        }
        if (params['domain']) {
            try {
                let result = url.parse(params['domain']);
                if (!result.host) {
                    return 'Invalid Domain';
                }
            }
            catch (error) {
                return 'Invalid Domain';
            }
        }
        return false;
    }
};
//# sourceMappingURL=validator.js.map