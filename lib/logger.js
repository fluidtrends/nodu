"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOk = exports.logError = exports.logInfo = exports.log = void 0;
var chalk_1 = __importDefault(require("chalk"));
function log(message, printer, newLine) {
    process.stdout.write(printer("" + message + (newLine ? '\n' : '')));
}
exports.log = log;
function logInfo(message) {
    log(message, chalk_1.default.bold, true);
}
exports.logInfo = logInfo;
function logError(err) {
    log(err.message, chalk_1.default.bgRed.yellowBright, true);
}
exports.logError = logError;
function logOk(message) {
    log("✔ ", chalk_1.default.green);
    log(message, chalk_1.default, true);
}
exports.logOk = logOk;
//# sourceMappingURL=logger.js.map