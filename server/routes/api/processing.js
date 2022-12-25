"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sharp = require("sharp");
var path = require("path");
var flopFunc = function (filename, ext, width, height, imageNameThumb, res) {
    sharp(path.join(path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'), filename + ext))
        .resize({ width: width, height: height })
        .flop()
        .toFile('thumbnail/' + imageNameThumb, function () {
        //open the created image
        if (res) {
            res.sendFile(path.join(path
                .join(path.join(__dirname, '..'), '..')
                .replace('src', 'thumbnail'), imageNameThumb));
        }
    });
};
var flipFunc = function (filename, ext, width, height, imageNameThumb, res) {
    sharp(path.join(path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'), filename + ext))
        .resize({ width: Number(width), height: Number(height) })
        .flip()
        .toFile('thumbnail/' + imageNameThumb, function () {
        //open the created image
        if (res) {
            res.sendFile(path.join(path
                .join(path.join(__dirname, '..'), '..')
                .replace('src', 'thumbnail'), imageNameThumb));
        }
    });
};
var grayscaleFunc = function (filename, ext, width, height, imageNameThumb, res) {
    sharp(path.join(path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'), filename + ext))
        .resize({ width: Number(width), height: Number(height) })
        .grayscale()
        .toFile('thumbnail/' + imageNameThumb, function () {
        //open the created image
        if (res) {
            res.sendFile(path.join(path
                .join(path.join(__dirname, '..'), '..')
                .replace('src', 'thumbnail'), imageNameThumb));
        }
    });
};
var resizeFunc = function (filename, ext, width, height, imageNameThumb, res) {
    sharp(path.join(path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'), filename + ext))
        .resize({ width: Number(width), height: Number(height) })
        .toFile('thumbnail/' + imageNameThumb, function () {
        //open the created image
        if (res) {
            res.sendFile(path.join(path
                .join(path.join(__dirname, '..'), '..')
                .replace('src', 'thumbnail'), imageNameThumb));
        }
        return true;
    });
    return false;
};
exports.default = {
    flipFunc: flipFunc,
    flopFunc: flopFunc,
    grayscaleFunc: grayscaleFunc,
    resizeFunc: resizeFunc
};
