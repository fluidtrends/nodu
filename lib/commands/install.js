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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
var pacote = __importStar(require("pacote"));
var __1 = require("..");
var __2 = require("..");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
function validate(input) {
    return __awaiter(this, void 0, void 0, function () {
        var id, manifest, to, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = input.module;
                    if (!id) {
                        throw new Error("The module is missing");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, pacote.manifest(id)];
                case 2:
                    manifest = _a.sent();
                    to = input.to || process.cwd();
                    to = path_1.default.resolve(to, manifest.name, manifest.version);
                    return [2 /*return*/, { id: id, to: to, version: manifest.version, name: manifest.name, deps: manifest.dependencies }];
                case 3:
                    e_1 = _a.sent();
                    throw new Error("The module does not exist");
                case 4: return [2 /*return*/];
            }
        });
    });
}
function exec(input) {
    return __awaiter(this, void 0, void 0, function () {
        var args;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validate(input)];
                case 1:
                    args = _a.sent();
                    if (!!fs_1.default.existsSync(args.to)) return [3 /*break*/, 3];
                    return [4 /*yield*/, pacote.extract(args.id, args.to)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    process.chdir(args.to);
                    return [4 /*yield*/, __2.npmCli('i --only=prod --no-warnings --no-progress --silent')];
                case 4:
                    _a.sent();
                    return [2 /*return*/, args];
            }
        });
    });
}
exports.exec = exec;
exports.default = (function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, exec(input)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                e_2 = _a.sent();
                __1.logError(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=install.js.map