import path from 'path'
import * as slana from 'slana'

import {
    resolveAll,
    logError 
} from '.'

export function run() {
    try {
        resolveAll()
        slana.run(path.dirname(__dirname))
    } catch (e) {
        logError(e)
    }
}