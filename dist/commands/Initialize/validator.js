"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    appValidator: (params) => {
        if (params['type'] && params['type'] !== 'Customization' && params['type'] !== 'Plugin') {
            return 'Invalid App Type';
        }
        if (params['preset'] && params['preset'] !== 'React' && params['preset'] !== 'ReactTS') {
            return 'Invalid Preset';
        }
        /* if (params['domain']) {
            try {
                let result = url.parse(params['domain']);
                console.log(url.parse('https://google.com.vn'))
                if (!result.host) {
                    return 'Invalid Domain'
                }
            } catch (error) {
                return 'Invalid Domain'
            }
        } */
        return false;
    }
};
//# sourceMappingURL=validator.js.map