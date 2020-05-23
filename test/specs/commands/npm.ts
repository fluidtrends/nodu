import savor, {
    Context,
    Completion
} from 'savor'

import npm, { exec } from '../../../src/commands/npm'

savor.

add('should run without a command', (context: Context, done: Completion) => {
    const stdout = savor.capture(process.stdout)

    savor.promiseShouldSucceed(npm(), done, (result) => {
        context.expect(stdout.release()).to.exist
    })
}).

run('npm command')
