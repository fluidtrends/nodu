import { logError } from '..'
import {
    npmCli,
    logInfo,
    logOk
} from '..'
import ora from 'ora'

function validate(input?: any) {
    const all: string[] = [].concat(process.argv as any).slice(3)
    const command = all.join(' ')

    return { command }
}

export async function exec (input?: any) {
    const args = validate(input)
   
    return await npmCli(args.command)
}

export default async (input?: any) => {
    try {
        await exec(input)
    } catch (e) {
        logError(e)
    }
}