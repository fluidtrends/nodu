import * as pacote from 'pacote'
import { logError } from '..'
import {
    npm,
    logInfo,
    logOk
} from '..'
import path from 'path'
import fs from 'fs'
import ora from 'ora'

async function validate(input?: any) {
    let id = input.module
    
    if (!id) {
        throw new Error(`The module is missing`)
    }

    const progress = ora('Installing ...').start()

    try {
        const manifest = await pacote.manifest(id)

        let to = input.to || process.cwd()
        to = path.resolve(to, manifest.name, manifest.version)
        
        return { id, progress, to, name: manifest.name, deps: manifest.dependencies }
    } catch (e) {
        progress.fail(e.message)
        throw new Error(`The module does not exist`)
    }
}

export async function exec (input?: any) {
    const args = await validate(input)

    if (!fs.existsSync(args.to)) {
        await pacote.extract(args.id, args.to)
    }

    process.chdir(args.to)
    const output = await npm('i --only=prod --no-warnings --no-progress --silent')
    args.progress.succeed(`Successfully installed`)

    return { path: args.to, output }
}

export default async (input?: any) => {
    try {
        const { output } = await exec(input)
        output && logInfo(output)
    } catch (e) {
        logError(e)
    }
}