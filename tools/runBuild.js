/* eslint-disable no-console */
const webpack = require('webpack')
const config = require('../webpack.config.prod.js')
const chalk = require('chalk')

process.env.NODE_ENV = 'production'

console.log(chalk.green('Start building app'))

webpack(config).run((error, stats) => {
    if (error) {
        console.log(chalk.red(error))
        return 1
    }

    const jsonStats = stats.toJson()

    if(stats.hasErrors()) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)))
    }

    if (stats.hasWarnings()) {
        console.log(chalk.yellow('Webpack generated the following warnings: '))
        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)))
    }

    console.log(chalk.green('App is compiled in production mode in /dist directory'))
    return 0
})
