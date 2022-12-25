"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = require("path");
var readme = express_1.default.Router();
//readme to access  /api/readme
readme.get('/', function (req, res) {
    res.sendFile(path.join(__dirname.replace('api', 'readme.txt')));
});
exports.default = readme;
