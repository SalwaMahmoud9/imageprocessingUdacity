"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validation_1 = __importDefault(require("./validation"));
var processing_1 = __importDefault(require("./processing"));
var images = express_1.default.Router();
var path = require("path");
var image_size_1 = __importDefault(require("image-size"));
//images to access  /api/images
images.get('/', function (req, res) {
    var ext; //set default extension
    ext = '.jpg';
    var outExtension;
    outExtension = '.jpg'; //set default outExtension
    var someExt = ['jpeg', 'jpg', 'png']; //some supported ext
    var someExtra = ['grayscale', 'flip', 'flop']; //some supported extra processing
    var extra; //set default extension
    extra = '';
    //check extra is exists, string
    if (req.query.extra && typeof req.query.extra == 'string') {
        for (var index = 0; index < someExtra.length; index++) {
            if (req.query.extra.toLowerCase().includes(someExtra[index])) {
                extra += '-' + someExtra[index]; //set ext with the ext in url parameters
            }
        }
    }
    //check ext is exists, string, and is one of someExt[]
    if (req.query.ext &&
        typeof req.query.ext == 'string' &&
        someExt.includes(req.query.ext.toLowerCase())) {
        ext = '.' + req.query.ext; //set ext with the ext in url parameters
    }
    //check out Extension is exists, string, and is one of someExt[]
    if (req.query.outExtension &&
        typeof req.query.outExtension == 'string' &&
        someExt.includes(req.query.outExtension.toLowerCase())) {
        outExtension = '.' + req.query.outExtension; //set outExtension with the outExtension in url parameters
    }
    console.log('extension:' + ext);
    console.log('output extension:' + outExtension);
    var newRequestData = {
        filename: '',
        width: '0',
        height: '0'
    };
    if (req.query.filename && (!req.query.width || !req.query.height)) {
        //       width, height or both not exist
        var currentImageWidth = void 0;
        currentImageWidth = '0';
        var currentImageHeight = void 0;
        currentImageHeight = '0';
        var currentImageName = void 0;
        currentImageName = '';
        if (validation_1.default.validImage({
            filename: req.query.filename,
            width: '0',
            height: '0'
        }, ext, '')) {
            currentImageName = req.query.filename;
            // if image exists in home/image/full, then get width and height
            var currentImage = path.join(path
                .join(__dirname, '..')
                .replace('src', 'images')
                .replace('routes', 'full'), req.query.filename + ext);
            // get image`s default width and height to be used if is missing in url
            var dimensions = (0, image_size_1.default)(currentImage);
            currentImageWidth = String(dimensions.width);
            currentImageHeight = String(dimensions.height);
            if (req.query.height) {
                //use url height if exist
                currentImageHeight = req.query.height;
            }
            if (req.query.width) {
                //user url width if exist
                currentImageWidth = req.query.width;
            }
        }
        newRequestData = {
            filename: currentImageName,
            width: currentImageWidth,
            height: currentImageHeight
        };
        console.log(currentImageWidth, currentImageHeight, newRequestData);
    }
    else if (!req.query.filename) {
        //if file name not in url
        res.send('Please add the parametes(filename, width,and height) in url as there is a missing data');
    }
    else {
        //         all parameters exists
        newRequestData = {
            filename: req.query.filename,
            width: req.query.width,
            height: req.query.height
        };
    }
    if (req.query.filename) {
        console.log('start validation', newRequestData);
        // check valid data in parameters
        var validActions = validation_1.default.validationFunc(newRequestData, ext);
        if (validActions == 0) {
            // valid data
            //  now we have a valid data in newRequestData and we can start image processing task
            var filename = newRequestData.filename;
            var width = newRequestData.width;
            var height = newRequestData.height;
            var imageNameThumb = void 0;
            imageNameThumb =
                ((filename + '-w' + width) + '-h' + height) +
                    outExtension; //filename-w(width)-h(height).ext
            if (extra.includes('flop')) {
                imageNameThumb =
                    ((filename + '-w' + width) + '-h' + height) +
                        '-flop' +
                        outExtension; //filename-w(width)-h(height).ext
            }
            else if (extra.includes('flip')) {
                imageNameThumb =
                    ((filename + '-w' + width) + '-h' + height) +
                        '-flip' +
                        outExtension; //filename-w(width)-h(height).ext
            }
            else if (extra.includes('grayscale')) {
                imageNameThumb =
                    ((filename + '-w' + width) + '-h' + height) +
                        '-grayscale' +
                        outExtension; //filename-w(width)-h(height).ext
            }
            console.log('image name in thumbnail:' + imageNameThumb);
            try {
                if (!validation_1.default.validImage(newRequestData, outExtension, imageNameThumb)) {
                    //file not created before
                    console.log('image not exists');
                    try {
                        if (extra.includes('flop')) {
                            // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
                            //add flop
                            processing_1.default.flopFunc(filename, ext, Number(width), Number(height), imageNameThumb, res);
                        }
                        else if (extra.includes('flip')) {
                            // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
                            //add flip
                            processing_1.default.flipFunc(filename, ext, Number(width), Number(height), imageNameThumb, res);
                        }
                        else if (extra.includes('grayscale')) {
                            // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
                            //add grayscale
                            processing_1.default.grayscaleFunc(filename, ext, Number(width), Number(height), imageNameThumb, res);
                        }
                        else {
                            // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
                            processing_1.default.resizeFunc(filename, ext, Number(width), Number(height), imageNameThumb, res);
                        }
                    }
                    catch (error) {
                        console.log(error);
                        // show error for user
                        res.send(('Error!! while creating the resized image[' +
                            error) + ']');
                    }
                    // add in logger
                    validation_1.default.addInLogger(('--' + imageNameThumb + ': created@' + new Date()));
                }
                else {
                    // image exists in thumbnail as its created before
                    console.log('image exists');
                    // open the existing image
                    res.sendFile(path.join(path
                        .join(path.join(__dirname, '..'), '..')
                        .replace('src', 'thumbnail'), imageNameThumb));
                    // add in logger
                    validation_1.default.addInLogger(('--' + imageNameThumb + ': accessed@' + new Date()));
                }
            }
            catch (error) {
                console.error(error);
                // show error for user
                res.send(('Error!! [' + error) + ']');
            }
        }
        // not valid filename or width or height
        else if (validActions == 1) {
            res.send('Please add valid data in url ex:filename=fjord&width=100&height=100');
        }
        //  image file name not exists in images/full
        else if (validActions == 2) {
            console.log(__dirname);
            res.send('Please add an existing file name in the url');
        }
        //     not valid number in width or height
        else if (validActions == 3) {
            res.send('Please add valid number in width and height');
        }
    }
});
exports.default = images;
