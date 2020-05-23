import path from 'path'
import fs from 'fs'
import { logError } from '..'

function validate(input?: any) {
    const scriptPath = path.resolve(input?.script || './index.js')

    if (!fs.existsSync(scriptPath)) {
        throw new Error(`The ${scriptPath} script is missing`)  
    }

    return { scriptPath }
}

export async function exec (input?: any) {
    const args = validate(input)

    require(args.scriptPath)
}

export default async (input?: any) => {
    try {
        await exec(input)
    } catch (e) {
        logError(e)
    }
}