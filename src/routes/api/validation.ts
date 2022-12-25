import path = require('path');
import fs = require('fs');

type RequestData = {
  filename: string;
  width: string;
  height: string;
};
const addInLogger = async (txt: string): Promise<void> => {
  try {
    // add action and time in log file
    txt += await fs.promises.readFile('logger.txt', 'utf-8');
    await fs.promises.writeFile(
      'logger.txt',
      txt
        .replace('GMT+0000 (Coordinated Universal Time)', '')
        .replace('(Eastern European Standard Time)', '')
        .replace('GMT+0200 ', '')
    );
  } catch (error) {
    console.error(error);
  }
};

const validationFunc = (req: RequestData, ext: string): number => {
  let validActions: number;
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

const validString = (req: RequestData): boolean => {
  let valid: boolean;
  valid = true;
  // check valid data in parameters
  if (
    typeof req.filename != 'string' ||
    typeof req.width != 'string' ||
    typeof req.height != 'string' ||
    req.filename == ''
  ) {
    valid = false;
  }
  return valid;
};

const validImage = (
  req: RequestData,
  ext: string,
  imageNameThumb: string
): boolean => {
  let valid: boolean;
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
    if (
      !fs.existsSync(
        path.join(
          path
            .join(__dirname, '..')
            .replace('src', 'images')
            .replace('routes', 'full')
            .replace('routes', 'full'),
          req.filename + ext
        )
      )
    ) {
      valid = false;
    }
  } else {
    if (
      !fs.existsSync(
        path.join(
          path
            .join(path.join(__dirname, '..'), '..')
            .replace('src', 'thumbnail'),
          imageNameThumb
        )
      )
    ) {
      valid = false;
    }
  }
  //     fs.close();
  return valid;
};
const validNumbers = (req: RequestData): boolean => {
  //     check valid number in width and height
  let valid: boolean;
  valid = true;
  if (
    isNaN(parseInt(req.width)) ||
    parseInt(req.width) <= 0 ||
    isNaN(parseInt(req.height)) ||
    parseInt(req.height) <= 0
  ) {
    valid = false;
  }
  return valid;
};
export default {
  addInLogger,
  validationFunc,
  validString,
  validImage,
  validNumbers
};
