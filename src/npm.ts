import nopt from 'nopt'

import {
    captureIO
} from '.'

export async function npm(cmd: string, progress?: (m: string) => void) : Promise<string> {
    return new Promise((resolve, reject) => {

        if (!process.env.NODU_NPM_LIB) {
            reject(new Error('Could not find npm'))
            return
        }

         let hasProgress = false
         let io: any = captureIO()   
              
         process.on('time', (m: string) => {
             hasProgress = true
             io && io.release()
             io = undefined
             progress && progress(m)
        })

        const original = cmd.split(' ').map(s => s.trim())
        process.argv = process.argv.slice(0,2).concat(original)
 
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
                io?.release()
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
                        io?.release().err
                        reject(err)
                        return
                    }
                    resolve(hasProgress ? '' : io?.release().out)
                })
            } catch (e) {
                io?.release()
                reject(e)
            }     
        })   
    })
}
