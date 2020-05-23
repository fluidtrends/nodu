import savor, {
    Context,
    Completion
} from 'savor'

import {
    exec
} from '../../src'

savor.

add('should not run an invalid command', (context: Context, done: Completion) => {
    savor.promiseShouldFail(exec('__oops', []), done, (error) => {
        context.expect(error.message).to.exist
    })
}).

add('should catch a command error', (context: Context, done: Completion) => {
    savor.promiseShouldFail(exec('ls', ['__oops']), done, (error) => {
        context.expect(error.message).to.exist
    })
}).

add('should run a script', (context: Context, done: Completion) => {
    savor.promiseShouldSucceed(exec('pwd', []), done, (pwd) => {
        context.expect(pwd).to.exist
    })
}).

run('System')
