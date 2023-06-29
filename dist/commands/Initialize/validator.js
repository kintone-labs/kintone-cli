"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    appValidator: (params) => {
        if (params.type &&
            params.type !== 'Customization' &&
            params.type !== 'Plugin') {
            return 'Invalid App Type';
        }
        if (params.preset &&
            params.preset !== 'React' &&
            params.preset !== 'ReactTS') {
            return 'Invalid Preset';
        }
        return false;
    }
};
//# sourceMappingURL=validator.js.map