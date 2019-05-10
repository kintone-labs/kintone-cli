"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buildWebpackReactTemplate = ({ entry, useTypescript, useReact, appName }) => {
    let jsRules;
    if (useTypescript) {
        jsRules = `{
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript']
                    }
                }
            },`;
        if (useReact) {
            jsRules += `{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/react', '@babel/preset-typescript']
                    }
                }
            },`;
        }
    }
    else {
        jsRules = `{
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },`;
        if (useReact) {
            jsRules += `{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/react']
                        }
                    }
                },`;
        }
    }
    return `const path = require('path');

        module.exports = {
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
            }
        }`;
};
exports.buildWebpackReactTemplate = buildWebpackReactTemplate;
exports.default = {
    buildWebpackReactTemplate
};
