import { logError } from '..'
import {
    npm 
} from '..'

function validate(input?: any) {
    const all: string[] = [].concat(process.argv as any).slice(3)
    const command = all.join(' ')

    return { command }
}

export async function exec (input?: any) {
    const args = validate(input)
    return await npm(args.command)
}

export default async (input?: any) => {
    try {
        const output = await exec(input)
        console.log(output)
    } catch (e) {
        logError(e)
    }
}