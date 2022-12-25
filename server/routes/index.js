"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var images_1 = __importDefault(require("./api/images"));
var readme_1 = __importDefault(require("./api/readme"));
var routes = express_1.default.Router();
//text to add in home page
var bodyText = 'welcome.. please go to <a href="/images">images</a> to start your trip with image processing, at least you should add filename, width, and height, for further information please check <a href="/api/readme">readme</a> file.';
//routes to access  /api which is my home page
routes.get('/', function (req, res) {
    res.send('<html> <head> <meta charset="utf-8">' +
        '<title>Image Processing</title> </head> <body> <article>' +
        bodyText +
        '</article>' +
        '</body></html>');
});
//routes to access  /api/readme
routes.use('/readme', readme_1.default);
//routes to access  /api/images
routes.use('/images', images_1.default);
exports.default = routes;
