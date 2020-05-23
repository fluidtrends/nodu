import { spawn } from 'child_process'
import ora from 'ora'

export function captureIO() {
    let stdoutStream = process.stdout.write 
    let stderrStream = process.stderr.write 
    
    let out = ''
    let err = ''

    process.stdout.write = (string: string) => {
        out = out + string
        return false        
    }
    
    process.stderr.write = (string: string) => {
        err = err + string
        return false      
    }

    const release = () => {
        process.stdout.write = stdoutStream
        process.stderr.write = stderrStream
        return { out: out.trim(), err: err.trim() }
    }

    return {
        release
    }
}

export async function exec(cmd: string, args: string[], log?: any): Promise<string> {
    const spinner = log ? ora(log.start).start() : undefined

    return new Promise((resolve, reject) => {
        let stdout = ''
        let stderr = ''

        const s = spawn(cmd, args)

        s.on('error', (error) => {
            spinner && spinner.fail(error.message)
            reject(error)
        });

        s.stdout.on('data', (data) => {
            stdout = `${stdout}${data}`
        });
        
        s.stderr.on('data', (data) => {
            stderr = `${stderr}${data}`
        });
        
        s.on('close', (code) => {
            if (code === 0) {
                spinner && spinner.succeed(log.done)
                resolve(stdout.trim())
                return
            }
            spinner && spinner.fail(stderr.trim())
            reject(new TypeError(stderr.trim()))
        })  
    })
}