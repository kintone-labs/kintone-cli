import {CommanderStatic} from "commander";
import {prompt} from "inquirer";
import chalk from "chalk";
import {writeFileSync} from "jsonfile";
import {spawnSync} from "child_process";
import {existsSync, mkdirSync} from "fs";

const initializeCommand = (program: CommanderStatic) => {
    const latestUIComponentVersion = '^0.2.0';
    const latestJsSdkVersion = '^0.2.0';
    const questions = [
        {
            type: 'input',
            name: 'name',
            message: 'Project name',
            default: 'kintone-customization-project'
        },
        {
            type: 'input',
            name: 'version',
            message: 'Version',
            default: '0.0.1'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Description',
            default: 'kintone customization project'
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author',
            default: ''
        },
        {
            type: 'input',
            name: 'license',
            message: 'License',
            default: 'MIT'
        },
        {
            type: 'confirm',
            name: 'dependencies.@kintone/kintone-ui-component',
            message: 'Do you want to use @kintone/kintone-ui-component?',
            default: true
        },
        {
            type: 'confirm',
            name: 'dependencies.@kintone/kintone-js-sdk',
            message: 'Do you want to use @kintone/kintone-js-sdk?',
            default: true
        }
    ]
    program
    .command('init')
    .description('Initialize kintone project')
    .option('--install')
    .action(async (cmd)=>{
        console.log(chalk.yellow('Welcome to kintone-cli!'));
        console.log(chalk.yellow('Please, input below information so we can get started!'));
        
        // ask info about project
        const packageInfo = await prompt(questions)
        if(packageInfo['dependencies']['@kintone/kintone-ui-component'])
        packageInfo['dependencies']['@kintone/kintone-ui-component'] = latestUIComponentVersion;
        if(packageInfo['dependencies']['@kintone/kintone-js-sdk'])
        packageInfo['dependencies']['@kintone/kintone-js-sdk'] = latestJsSdkVersion;

        // create project folder 
        const projectFolder = global['currentDir'] + '/' + packageInfo['name'];
        if(existsSync(projectFolder)) {
            console.error(chalk.red('Project folder already exists! Please, run the cli again and choose another project name.'))
            process.exit(-1)
        }
        mkdirSync(projectFolder);

        // write project info object to package.json
        const packageJsonPath = projectFolder + '/package.json'
        writeFileSync(packageJsonPath, packageInfo, { spaces: 2, EOL: '\r\n' });
        
        // if install is specified run npm install
        if(cmd.install) {
            process.chdir(projectFolder);
            console.log(chalk.yellow('Installing dependencies...'));
            spawnSync('npm', ['i'], {stdio: "inherit"})
        }
        console.log(chalk.yellow('You are all set! Happy kintone customizing!'));
    })
}

export default initializeCommand