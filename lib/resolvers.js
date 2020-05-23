"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAll = exports.resolveNpm = exports.resolveNode = void 0;
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs"));
function resolveNode() {
    var nodeExec = path_1.default.resolve(process.execPath);
    var nodeBin = path_1.default.dirname(nodeExec);
    var nodeRoot = path_1.default.dirname(nodeBin);
    var nodeGlobalModulesRoot = path_1.default.resolve(nodeRoot, 'lib', 'node_modules');
    process.env.NODU_NODE_HOME = nodeRoot;
    process.env.NODU_NODE_EXEC = nodeExec;
    process.env.NODU_NODE_BIN = nodeBin;
    process.env.NODU_NODE_GLOBAL_HOME = nodeGlobalModulesRoot;
}
exports.resolveNode = resolveNode;
function resolveNpm() {
    if (!process.env.NODU_NODE_HOME) {
        return;
    }
    var npmScript = path_1.default.resolve(require.resolve('npm'));
    if (!fs.existsSync(npmScript)) {
        return;
    }
    var npmLib = path_1.default.dirname(npmScript);
    var npmRoot = path_1.default.dirname(npmLib);
    process.env.NODU_NPM_HOME = npmRoot;
    process.env.NODU_NPM_LIB = npmLib;
}
exports.resolveNpm = resolveNpm;
function resolveAll() {
    resolveNode();
    resolveNpm();
}
exports.resolveAll = resolveAll;
//# sourceMappingURL=resolvers.js.map