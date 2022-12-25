"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// use {Request, Response, NextFunction} instead of express
var logger = function (req, res, next) {
    //use cont instead of let to use lint error
    var url = req.url;
    console.log(url + ' visited');
    next();
};
exports.default = logger;
