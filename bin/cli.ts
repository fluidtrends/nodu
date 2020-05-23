#!/usr/bin/env node_modules/.bin/ts-node-script

const nodu = require('../src')
nodu.resolveAll()

console.log(process.env)
