import * as pacote from 'pacote'
import { logError } from '..'
import {
    npmCli,
    logInfo,
    logOk
} from '..'
import path from 'path'
import fs from 'fs'

async function validate(input?: any) {
    let id = input.module
    
    if (!id) {
        throw new Error(`The module is missing`)
    }

    try {
        const manifest = await pacote.manifest(id)

        let to = input.to || process.cwd()
        to = path.resolve(to, manifest.name, manifest.version)
        
        return { id, to, version: manifest.version, name: manifest.name, deps: manifest.dependencies }
    } catch (e) {
        throw new Error(`The module does not exist`)
    }
}

export async function exec (input?: any) {
    const args = await validate(input)

    if (!fs.existsSync(args.to)) {
        await pacote.extract(args.id, args.to)
    }

    process.chdir(args.to)
    await npmCli('i --only=prod --no-warnings --no-progress --silent')

    return args
}

export default async (input?: any) => {
    try {
       return await exec(input)
    } catch (e) {
        logError(e)
    }
}