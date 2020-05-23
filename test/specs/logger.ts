import savor, {
    Context,
    Completion
} from 'savor'

import chalk from 'chalk'
import {
    logInfo,
    logError,
    logOk
} from '../../src'

savor.

add('should log info', (context: Context, done: Completion) => {
    const stdout = savor.capture(process.stdout)

    logInfo('test1234')
    
    context.expect(stdout.release()).to.equal(chalk.bold('test1234\n'))
    done()
}).

add('should log error', (context: Context, done: Completion) => {
    const stdout = savor.capture(process.stdout)

    logError(new TypeError('error1234'))
    
    context.expect(stdout.release()).to.equal(chalk.bgRed.yellowBright('error1234\n'))
    done()
}).

 
add('should log ok', (context: Context, done: Completion) => {
    const stdout = savor.capture(process.stdout)

    logOk('ok1234')
    
    context.expect(stdout.release()).to.equal(chalk.green('✔ ') + chalk('ok1234\n'))
    done()
}).

run('Logger')
