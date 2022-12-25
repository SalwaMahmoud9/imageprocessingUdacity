"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var addInLogger = function (txt) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                // add action and time in log file
                _a = txt;
                return [4 /*yield*/, fs.promises.readFile('logger.txt', 'utf-8')];
            case 1:
                // add action and time in log file
                txt = _a + _b.sent();
                return [4 /*yield*/, fs.promises.writeFile('logger.txt', txt
                        .replace('GMT+0000 (Coordinated Universal Time)', '')
                        .replace('(Eastern European Standard Time)', '')
                        .replace('GMT+0200 ', ''))];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var validationFunc = function (req, ext) {
    var validActions;
    validActions = 0;
    // check valid data in parameters
    if (!validString(req)) {
        validActions = 1;
    }
    //  check that image file name already exists in images/full
    else if (!validImage(req, ext, '')) {
        validActions = 2;
    }
    //     check valid number in width and height
    else if (!validNumbers(req)) {
        validActions = 3;
    }
    return validActions;
};
var validString = function (req) {
    var valid;
    valid = true;
    // check valid data in parameters
    if (typeof req.filename != 'string' ||
        typeof req.width != 'string' ||
        typeof req.height != 'string' ||
        req.filename == '') {
        valid = false;
    }
    return valid;
};
var validImage = function (req, ext, imageNameThumb) {
    var valid;
    valid = true;
    //  check that image file name already exists in images/full
    if (imageNameThumb == '') {
        // console.log(
        //   path.join(
        //     path
        //       .join(__dirname, '..')
        //       .replace('src', 'images')
        //       .replace('routes', 'full')
        //       .replace('tests', 'full'),
        //     req.filename + ext
        //   )
        // );
        if (!fs.existsSync(path.join(path
            .join(__dirname, '..')
            .replace('src', 'images')
            .replace('routes', 'full')
            .replace('routes', 'full'), req.filename + ext))) {
            valid = false;
        }
    }
    else {
        if (!fs.existsSync(path.join(path
            .join(path.join(__dirname, '..'), '..')
            .replace('src', 'thumbnail'), imageNameThumb))) {
            valid = false;
        }
    }
    //     fs.close();
    return valid;
};
var validNumbers = function (req) {
    //     check valid number in width and height
    var valid;
    valid = true;
    if (isNaN(parseInt(req.width)) ||
        parseInt(req.width) <= 0 ||
        isNaN(parseInt(req.height)) ||
        parseInt(req.height) <= 0) {
        valid = false;
    }
    return valid;
};
exports.default = {
    addInLogger: addInLogger,
    validationFunc: validationFunc,
    validString: validString,
    validImage: validImage,
    validNumbers: validNumbers
};
