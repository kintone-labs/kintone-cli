const docCommand = (program) => {
    program
    .command('help')
    .alias('h')
    .description('kintone Node CLI help')
    .action((cmd) => {
        console.log(123)
    });
}

export default docCommand