import savor, {
    Context,
    Completion
} from 'savor'

import run, { exec } from '../../../src/commands/run'

savor.

add('should not run without a script', (context: Context, done: Completion) => {
    const stdout = savor.capture(process.stdout)

    savor.promiseShouldFail(exec(), done, (error) => {
        stdout.release()
        context.expect(error).to.exist
    })
}).


add('should run with a default script', (context: Context, done: Completion) => {
    const stdout = savor.capture(process.stdout)
    savor.addAsset('assets/script.js', 'index.js', context)

    savor.promiseShouldSucceed(run(), done, (result) => {
        context.expect(stdout.release()).to.equal('testok\n')
    })
}).

run('run command')
