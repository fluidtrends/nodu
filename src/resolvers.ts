import path from 'path'
import * as fs from 'fs'

export function resolveNode() {
    const nodeExec = path.resolve(process.execPath)
    const nodeBin = path.dirname(nodeExec)
    const nodeRoot = path.dirname(nodeBin)
    const nodeGlobalModulesRoot = path.resolve(nodeRoot, 'lib', 'node_modules')

    process.env.NODU_NODE_HOME = nodeRoot
    process.env.NODU_NODE_EXEC = nodeExec
    process.env.NODU_NODE_BIN = nodeBin
    process.env.NODU_NODE_GLOBAL_HOME = nodeGlobalModulesRoot
}

export function resolveNpm() {
    if (!process.env.NODU_NODE_HOME) {
        return 
    }

    const npmScript = path.resolve(require.resolve('npm'))

    if (!fs.existsSync(npmScript)) {
        return
    }

    const npmLib = path.dirname(npmScript)
    const npmRoot = path.dirname(npmLib)
    const npmBin = path.resolve(path.dirname(__dirname), 'bin', 'npm.js')

    process.env.NODU_NPM_BIN = npmBin
    process.env.NODU_NPM_HOME = npmRoot
    process.env.NODU_NPM_LIB = npmLib
}

export function resolveAll () {
    resolveNode()
    resolveNpm()
}
