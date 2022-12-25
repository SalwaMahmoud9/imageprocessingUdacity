import { Response } from 'express';
import sharp = require('sharp');
import path = require('path');

const flopFunc = (
  filename: string,
  ext: string,
  width: number,
  height: number,
  imageNameThumb: string,
  res?: Response
): void => {
  sharp(
    path.join(
      path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'),
      filename + ext
    )
  )
    .resize({ width, height })
    .flop()
    .toFile('thumbnail/' + imageNameThumb, () => {
      //open the created image
      if (res) {
        res.sendFile(
          path.join(
            path
              .join(path.join(__dirname, '..'), '..')
              .replace('src', 'thumbnail'),
            imageNameThumb
          )
        );
      }
    });
};
const flipFunc = (
  filename: string,
  ext: string,
  width: number,
  height: number,
  imageNameThumb: string,
  res?: Response
): void => {
  sharp(
    path.join(
      path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'),
      filename + ext
    )
  )
    .resize({ width: Number(width), height: Number(height) })
    .flip()
    .toFile('thumbnail/' + imageNameThumb, () => {
      //open the created image
      if (res) {
        res.sendFile(
          path.join(
            path
              .join(path.join(__dirname, '..'), '..')
              .replace('src', 'thumbnail'),
            imageNameThumb
          )
        );
      }
    });
};
const grayscaleFunc = (
  filename: string,
  ext: string,
  width: number,
  height: number,
  imageNameThumb: string,
  res?: Response
): void => {
  sharp(
    path.join(
      path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'),
      filename + ext
    )
  )
    .resize({ width: Number(width), height: Number(height) })
    .grayscale()
    .toFile('thumbnail/' + imageNameThumb, () => {
      //open the created image
      if (res) {
        res.sendFile(
          path.join(
            path
              .join(path.join(__dirname, '..'), '..')
              .replace('src', 'thumbnail'),
            imageNameThumb
          )
        );
      }
    });
};
const resizeFunc = (
  filename: string,
  ext: string,
  width: number,
  height: number,
  imageNameThumb: string,
  res?: Response
): boolean => {
  sharp(
    path.join(
      path
        .join(__dirname, '..')
        .replace('src', 'images')
        .replace('routes', 'full'),
      filename + ext
    )
  )
    .resize({ width: Number(width), height: Number(height) })
    .toFile('thumbnail/' + imageNameThumb, () => {
      //open the created image
      if (res) {
        res.sendFile(
          path.join(
            path
              .join(path.join(__dirname, '..'), '..')
              .replace('src', 'thumbnail'),
            imageNameThumb
          )
        );
      }
      return true;
    });
  return false;
};
export default {
  flipFunc,
  flopFunc,
  grayscaleFunc,
  resizeFunc
};
