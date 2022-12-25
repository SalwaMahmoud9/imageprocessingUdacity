import express, { Request, Response } from 'express';

import path = require('path');
const readme = express.Router();
//readme to access  /api/readme

readme.get('/', (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname.replace('api', 'readme.txt')));
});

export default readme;
