"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs = require("fs");
const configArr = (fs.readFileSync(`${__dirname}/../../../../.kintone/.config`, "utf8")).split("\n");
let configData = {};
configArr.forEach((configString) => {
    configData[configString.split("=")[0]] = configString.split("=")[1];
});
exports.default = {
    createRecord: (appID, recordData, spaceID, proxy) => __awaiter(this, void 0, void 0, function* () {
        const axiosConfig = {
            url: (spaceID) ? (`https://${configData['domain']}/k/guest/${spaceID}/v1/record.json`) : (`https://${configData['domain']}/k/v1/record.json`),
            method: 'post',
            data: {
                app: appID,
                record: recordData
            },
            headers: {
                'X-Cybozu-Authorization': Buffer.from(`${configData['username']}:${configData['password']}`).toString('base64')
            }
        };
        if (proxy) {
            axiosConfig['proxy'] = proxy;
        }
        let result;
        try {
            result = yield axios_1.default(axiosConfig);
        }
        catch (error) {
            result = error;
        }
        if (result.status === 200) {
            return result.data;
        }
        return result;
    }),
    readRecord: (appID, recordID, spaceID, proxy) => __awaiter(this, void 0, void 0, function* () {
        const axiosConfig = {
            url: (spaceID) ? (`https://${configData['domain']}/k/guest/${spaceID}/v1/record.json`) : (`https://${configData['domain']}/k/v1/record.json`),
            method: 'get',
            params: {
                app: appID,
                id: recordID
            },
            headers: {
                'X-Cybozu-Authorization': Buffer.from(`${configData['username']}:${configData['password']}`).toString('base64')
            }
        };
        if (proxy) {
            axiosConfig['proxy'] = proxy;
        }
        let result;
        try {
            result = yield axios_1.default(axiosConfig);
        }
        catch (error) {
            result = error;
        }
        if (result.status === 200) {
            return result.data;
        }
        return result;
    })
};
//# sourceMappingURL=record.js.map