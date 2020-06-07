import nopt from 'nopt'

import {
    captureIO,
    resolveAll,
    logError,
    exec
} from '.'

export async function runNpm(args?: string) : Promise<string> {
    return new Promise((resolve, reject) => {
        if (!process.env.NODU_NPM_LIB) {
            reject(new Error('Could not find npm'))
            return
        }

        let io: any = captureIO()               

        if (args) {
            const original = args.split(' ').map(s => s.trim())
            process.argv = process.argv.slice(0,2).concat(original)
        }
 
        const _npm = require(`${process.env.NODU_NPM_LIB}/npm.js`)
        const npmconf = require(`${process.env.NODU_NPM_LIB}/config/core.js`)

        const configDefs = npmconf.defs
        const shorthands = configDefs.shorthands
        const types = configDefs.types
        const conf = nopt(types, shorthands)

        _npm.argv = conf.argv.remain
        _npm.command = _npm.argv.shift()
        
        conf._exit = false

        _npm.load(conf, (er: TypeError) => {
            if (er) {
                const e = io?.release().err
                args || console.log(er)
                reject(er)
                return
            }

            try {
                const _cmd = _npm.commands[_npm.command]

                if (!_cmd) {
                    throw new Error("Looks like an invalid npm command")
                }

                _cmd(_npm.argv, (err: TypeError) => {
                    if (err) {
                        const e = io?.release().err
                        args || console.log(err)
                        reject(err)
                        return
                    }
                    const out = io?.release().out
                    args || (out && console.log(out))
                    resolve(out)
                })
            } catch (e) {
                const er = io?.release().err
                args || logError(e)
                reject(e)
            }     
        })   
    })
}

export async function npmCli (args: string = '', msg: [string, string] = ['Please hold on a minute ...', 'Done']) {
    resolveAll()

    const LONG_PROC_CMDS = ['i', 'install']

    const cmd: string[] = args ? args.split(' ') : process.argv.splice(2)

    const out = await exec(process.env.NODU_NPM_BIN!, cmd, {
        start: msg[0],
        done: msg[1]
    })
    
    LONG_PROC_CMDS.includes(cmd[0]) || console.log(out)
}

export async function npm(cmd: string) : Promise<string> {
    return runNpm(cmd)
}
