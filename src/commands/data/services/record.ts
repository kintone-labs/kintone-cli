import axios from 'axios'
import * as fs from 'fs'

const configArr = (fs.readFileSync(`${__dirname}/../../../../.kintone/.config`, "utf8")).split("\n")
let configData = {}
configArr.forEach((configString: string) => {
    configData[configString.split("=")[0]] = configString.split("=")[1]
})

export default {
    createRecord: async (appID: number, recordData: object, spaceID?: number, proxy?:object ) => {
        const axiosConfig = {
            url: (spaceID)?(`https://${configData['domain']}/k/guest/${spaceID}/v1/record.json`):(`https://${configData['domain']}/k/v1/record.json`),
            method: 'post',
            data: {
                app: appID,
                record: recordData
            },
            headers: {
                'X-Cybozu-Authorization': Buffer.from(`${configData['username']}:${configData['password']}`).toString('base64')
            }
        }
        if (proxy) {
            axiosConfig['proxy'] = proxy
        }
        let result
        try {
            result = await axios(axiosConfig)
        } catch (error) {
            result = error
        }
        if (result.status === 200) {
            return result.data
        }
        return result
    },
    readRecord: async (appID: number, recordID: number, spaceID?: number, proxy?: object) => {
        const axiosConfig = {
            url: (spaceID)?(`https://${configData['domain']}/k/guest/${spaceID}/v1/record.json`):(`https://${configData['domain']}/k/v1/record.json`),
            method: 'get',
            params: {
                app: appID,
                id: recordID
            },
            headers: {
                'X-Cybozu-Authorization': Buffer.from(`${configData['username']}:${configData['password']}`).toString('base64')
            }
        }
        if (proxy) {
            axiosConfig['proxy'] = proxy
        }
        let result
        try {
            result = await axios(axiosConfig)
        } catch (error) {
            result = error
        }
        if (result.status === 200) {
            return result.data
        }
        return result
    }   
}