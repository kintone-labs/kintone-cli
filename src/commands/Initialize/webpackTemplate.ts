import {WebpackParams} from '../../dto/app'
const buildWebpackReactTemplate = ({entry, useTypescript, useReact, appName, type}:WebpackParams):string => {
    let jsRules: string
    let configEntry
    let pluginConfig = ''
    if (useTypescript) {
        configEntry = 'config.ts'
        jsRules = `{
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-typescript']
                    }
                }
            },`
        if (useReact) {
            jsRules += `{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react', '@babel/preset-typescript']
                    }
                }
            },`
            configEntry = 'config.tsx'
        }
    }
    else {
        configEntry = 'config.js'
        jsRules = `{
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },`
        if (useReact) {
            jsRules += `{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/react']
                        }
                    }
                },`
            configEntry = 'config.jsx'
        }
    }
    if (type === 'Plugin') {
        pluginConfig = `
        const configPlugin = {
            entry: path.resolve('${appName}/source/js/${configEntry}'),
            resolve: {
                extensions: ['.ts', '.tsx', '.js']
            },
            output: {
                path: path.resolve('${appName}/dist'),
                filename: 'config.min.js',
            },
            module: {
                rules: [
                    ${jsRules}
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    }
                ]
            },
            performance: {
                maxEntrypointSize: 10000000,
                maxAssetSize: 10000000
            }
        }
        `
    }
    return `const path = require('path');
        const config = {
            entry: path.resolve('${appName}/source/${entry}'),
            resolve: {
                extensions: ['.ts', '.tsx', '.js']
            },
            output: {
                path: path.resolve('${appName}/dist'),
                filename: '${appName}.min.js',
            },
            module: {
                rules: [
                    ${jsRules}
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader']
                    }
                ]
            },
            performance: {
                maxEntrypointSize: 10000000,
                maxAssetSize: 10000000
            }
        }

        ${pluginConfig}

        module.exports = (env, argv) => {
            'use strict';
            if (argv.mode === 'development') {
                config.devtool = 'source-map';
                ${
                    type === 'Plugin' &&
                    `configPlugin.devtool='source-map';`
                }
            }
          
            if (argv.mode === 'production') {
              //...
            }
            ${
                type === 'Plugin' ?
                'return [config, configPlugin];':
                'return [config];'
            }
        };`
}
export default {
    buildWebpackReactTemplate
}

export {
    buildWebpackReactTemplate
}