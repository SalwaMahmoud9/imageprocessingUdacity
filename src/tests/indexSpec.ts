import supertest from 'supertest';
import app from '../index';
// import images from '../routes/api/images';
import validation from '../routes/api/validation.js';
import processing from '../routes/api/processing.js';
const request = supertest(app);
// import path = require('path');
// import fs = require('fs');
type RequestData = {
  filename: string;
  width: string;
  height: string;
};
describe('Test endpoints responses', () => {
  it('tests the main endpoint', async () => {
    //       test home page
    const response = await request.get('/api');
    //status check
    expect(response.status).toEqual(200);
    //home page content check
    expect(response.text).toEqual(
      '<html> <head> <meta charset="utf-8"><title>Image Processing</title> </head> <body> <article>welcome.. please go to <a href="/images">images</a> to start your trip with image processing, at least you should add filename, width, and height, for further information please check <a href="/api/readme">readme</a> file.</article></body></html>'
    );
  });
});
describe('Test image processing responses', () => {
  it('tests image:fjord with width=200 & height=200', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    //status check
    expect(response.status).toBe(200);
    // body`s type is object
    expect(typeof response.body).toEqual('object');
    // body is defined
    expect(response.body).toBeDefined();
  });
  it('tests with ext image:fjordCopy with width=200 & height=200 & ext = png', async () => {
    const response = await request.get(
      '/api/images?filename=fjordCopy&width=200&height=200&ext=png'
    );
    //status check
    expect(response.status).toBe(200);
    // body`s type is object
    expect(typeof response.body).toEqual('object');
    // body is notNull
    expect(response.body).not.toBeNull();
  });
});
describe('Test validation functions', () => {
  const requestData: RequestData = {
    filename: 'fjord',
    width: '200',
    height: '200'
  };
  it('tests addInLogger', async () => {
    //add in log file check
    expect(validation.addInLogger('')).toBeTruthy();
  });
  it('tests validation parametes strings ', async () => {
    //string check
    expect(validation.validString(requestData)).toEqual(true);
  });
  it('tests validation parametes numbers', async () => {
    //numbers check
    expect(validation.validNumbers(requestData)).toEqual(true);
  });
});

describe('Test image processing Functions', () => {
  const requestData: RequestData = {
    filename: 'fjord',
    width: '200',
    height: '300'
  };
  const imageNameThumb =
    ((((requestData.filename + '-w' + requestData.width) as string) +
      '-h' +
      requestData.height) as string) + '.jpg';
  it('tests resize func', async () => {
    //resize
    expect(async () => {
      await processing.resizeFunc(
        requestData.filename,
        '.jpg',
        Number(requestData.width),
        Number(requestData.height),
        imageNameThumb
      );
    }).toBeTruthy();
  });
});
