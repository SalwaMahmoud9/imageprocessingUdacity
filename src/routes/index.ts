import express, { Request, Response } from 'express';
import images from './api/images';
import readme from './api/readme';

const routes = express.Router();

//text to add in home page
const bodyText =
  'welcome.. please go to <a href="/images">images</a> to start your trip with image processing, at least you should add filename, width, and height, for further information please check <a href="/api/readme">readme</a> file.';

//routes to access  /api which is my home page
routes.get('/', (req: Request, res: Response): void => {
  res.send(
    '<html> <head> <meta charset="utf-8">' +
      '<title>Image Processing</title> </head> <body> <article>' +
      bodyText +
      '</article>' +
      '</body></html>'
  );
});

//routes to access  /api/readme
routes.use('/readme', readme);

//routes to access  /api/images
routes.use('/images', images);

export default routes;
