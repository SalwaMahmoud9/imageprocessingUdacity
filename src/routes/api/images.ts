import express, { Request, Response } from 'express';
import validation from './validation';
import processing from './processing';
const images = express.Router();
import path = require('path');
import imageSize from 'image-size';

type RequestData = {
  filename: string;
  width: string;
  height: string;
};

//images to access  /api/images
images.get('/', (req: Request, res: Response): void => {
  let ext: string; //set default extension
  ext = '.jpg';
  let outExtension: string;
  outExtension = '.jpg'; //set default outExtension
  const someExt: string[] = ['jpeg', 'jpg', 'png']; //some supported ext
  const someExtra: string[] = ['grayscale', 'flip', 'flop']; //some supported extra processing
  let extra: string; //set default extension
  extra = '';
  //check extra is exists, string
  if (req.query.extra && typeof req.query.extra == 'string') {
    for (let index = 0; index < someExtra.length; index++) {
      if (req.query.extra.toLowerCase().includes(someExtra[index])) {
        extra += '-' + someExtra[index]; //set ext with the ext in url parameters
      }
    }
  }
  //check ext is exists, string, and is one of someExt[]
  if (
    req.query.ext &&
    typeof req.query.ext == 'string' &&
    someExt.includes(req.query.ext.toLowerCase())
  ) {
    ext = '.' + req.query.ext; //set ext with the ext in url parameters
  }
  //check out Extension is exists, string, and is one of someExt[]
  if (
    req.query.outExtension &&
    typeof req.query.outExtension == 'string' &&
    someExt.includes(req.query.outExtension.toLowerCase())
  ) {
    outExtension = '.' + req.query.outExtension; //set outExtension with the outExtension in url parameters
  }
  console.log('extension:' + ext);
  console.log('output extension:' + outExtension);
  let newRequestData: RequestData = {
    filename: '',
    width: '0',
    height: '0'
  };

  if (req.query.filename && (!req.query.width || !req.query.height)) {
    //       width, height or both not exist
    let currentImageWidth: string;
    currentImageWidth = '0';
    let currentImageHeight: string;
    currentImageHeight = '0';
    let currentImageName: string;
    currentImageName = '';

    if (
      validation.validImage(
        {
          filename: req.query.filename as unknown as string,
          width: '0',
          height: '0'
        },
        ext,
        ''
      )
    ) {
      currentImageName = req.query.filename as unknown as string;
      // if image exists in home/image/full, then get width and height

      const currentImage = path.join(
        path
          .join(__dirname, '..')
          .replace('src', 'images')
          .replace('routes', 'full'),
        (req.query.filename as unknown as string) + ext
      );
      // get image`s default width and height to be used if is missing in url
      const dimensions = imageSize(currentImage);
      currentImageWidth = String(dimensions.width);
      currentImageHeight = String(dimensions.height);
      if (req.query.height) {
        //use url height if exist
        currentImageHeight = req.query.height as unknown as string;
      }
      if (req.query.width) {
        //user url width if exist
        currentImageWidth = req.query.width as unknown as string;
      }
    }
    newRequestData = {
      filename: currentImageName,
      width: currentImageWidth,
      height: currentImageHeight
    };
    console.log(currentImageWidth, currentImageHeight, newRequestData);
  } else if (!req.query.filename) {
    //if file name not in url
    res.send(
      'Please add the parametes(filename, width,and height) in url as there is a missing data'
    );
  } else {
    //         all parameters exists
    newRequestData = {
      filename: req.query.filename as unknown as string,
      width: req.query.width as unknown as string,
      height: req.query.height as unknown as string
    };
  }

  if (req.query.filename) {
    console.log('start validation', newRequestData);
    // check valid data in parameters
    const validActions: number = validation.validationFunc(newRequestData, ext);
    if (validActions == 0) {
      // valid data
      //  now we have a valid data in newRequestData and we can start image processing task
      const filename: string = newRequestData.filename as unknown as string;
      const width: number = newRequestData.width as unknown as number;
      const height: number = newRequestData.height as unknown as number;
      let imageNameThumb: string;
      imageNameThumb =
        ((((filename + '-w' + width) as string) + '-h' + height) as string) +
        outExtension; //filename-w(width)-h(height).ext
      if (extra.includes('flop')) {
        imageNameThumb =
          ((((filename + '-w' + width) as string) + '-h' + height) as string) +
          '-flop' +
          outExtension; //filename-w(width)-h(height).ext
      } else if (extra.includes('flip')) {
        imageNameThumb =
          ((((filename + '-w' + width) as string) + '-h' + height) as string) +
          '-flip' +
          outExtension; //filename-w(width)-h(height).ext
      } else if (extra.includes('grayscale')) {
        imageNameThumb =
          ((((filename + '-w' + width) as string) + '-h' + height) as string) +
          '-grayscale' +
          outExtension; //filename-w(width)-h(height).ext
      }

      console.log('image name in thumbnail:' + imageNameThumb);
      try {
        if (
          !validation.validImage(newRequestData, outExtension, imageNameThumb)
        ) {
          //file not created before
          console.log('image not exists');
          try {
            if (extra.includes('flop')) {
              // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
              //add flop
              processing.flopFunc(
                filename,
                ext,
                Number(width),
                Number(height),
                imageNameThumb,
                res
              );
            } else if (extra.includes('flip')) {
              // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
              //add flip
              processing.flipFunc(
                filename,
                ext,
                Number(width),
                Number(height),
                imageNameThumb,
                res
              );
            } else if (extra.includes('grayscale')) {
              // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
              //add grayscale
              processing.grayscaleFunc(
                filename,
                ext,
                Number(width),
                Number(height),
                imageNameThumb,
                res
              );
            } else {
              // resize image with width, and height , and then save it (toFile)  in thumbnail folder with the new name(with width, and height)
              processing.resizeFunc(
                filename,
                ext,
                Number(width),
                Number(height),
                imageNameThumb,
                res
              );
            }
          } catch (error) {
            console.log(error);
            // show error for user
            res.send(
              (('Error!! while creating the resized image[' +
                error) as string) + ']'
            );
          }
          // add in logger
          validation.addInLogger(
            ('--' + imageNameThumb + ': created@' + new Date()) as string
          );
        } else {
          // image exists in thumbnail as its created before
          console.log('image exists');
          // open the existing image
          res.sendFile(
            path.join(
              path
                .join(path.join(__dirname, '..'), '..')
                .replace('src', 'thumbnail'),

              imageNameThumb
            )
          );
          // add in logger
          validation.addInLogger(
            ('--' + imageNameThumb + ': accessed@' + new Date()) as string
          );
        }
      } catch (error) {
        console.error(error);
        // show error for user
        res.send((('Error!! [' + error) as string) + ']');
      }
    }
    // not valid filename or width or height
    else if (validActions == 1) {
      res.send(
        'Please add valid data in url ex:filename=fjord&width=100&height=100'
      );
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

export default images;
