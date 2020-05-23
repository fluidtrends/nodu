import chalk, { Chalk } from 'chalk'

export function log(message: string, printer: Chalk, newLine?: boolean) { 
    process.stdout.write(printer(`${message}${newLine ? '\n': ''}`))
}

export function logInfo(message: string) {
    log(message, chalk.bold, true)
}

export function logError(err: TypeError) {
    log(err.message, chalk.bgRed.yellowBright, true)
}

export function logOk(message: string) {
    log("✔ ", chalk.green)
    log(message, chalk, true)
}
