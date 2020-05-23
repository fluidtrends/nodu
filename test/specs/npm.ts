import savor, {
    Context,
    Completion
} from 'savor'

import {
    resolveAll,
    resolveNpm,
    npm
} from '../../src'

savor.

add('should not run npm if it is not resolved', (context: Context, done: Completion) => {
    process.env.NODU_NPM_LIB && delete process.env.NODU_NPM_LIB

    savor.promiseShouldFail(npm('root'), done, (error) => {
        context.expect(error.message).to.exist
    })    
}).

add('should not resolve npm without node', (context: Context, done: Completion) => {
    process.env.NODU_NODE_HOME && delete process.env.NODU_NODE_HOME
    process.env.NODU_NPM_HOME && delete process.env.NODU_NPM_HOME

    resolveNpm()

    context.expect(process.env.NODU_NPM_HOME).to.not.exist

    done()
}).

add('should resolve all', (context: Context, done: Completion) => {
    resolveAll()

    context.expect(process.env.NODU_NODE_HOME).to.exist
    context.expect(process.env.NODU_NODE_EXEC).to.exist
    context.expect(process.env.NODU_NODE_BIN).to.exist
    context.expect(process.env.NODU_NODE_GLOBAL_HOME).to.exist

    context.expect(process.env.NODU_NPM_HOME).to.exist
    context.expect(process.env.NODU_NPM_LIB).to.exist

    done()
}).

add('should catch an invalid npm command', (context: Context, done: Completion) => {
    savor.promiseShouldFail(npm('__oops'), done, (error) => {
        context.expect(error.message).to.exist
    })    
}).

add('should catch an npm command that fails', (context: Context, done: Completion) => {
    savor.promiseShouldFail(npm('i __oops__'), done, (error) => {
        context.expect(error.message).to.exist
    })    
}).

add('should run an npm command', (context: Context, done: Completion) => {
    savor.promiseShouldSucceed(npm('root'), done, (result) => {
        context.expect(result).to.exist
    })    
}).

run('Npm')
