import { Request, Response, NextFunction } from 'express'; //to solve lint errors
// use {Request, Response, NextFunction} instead of express

const logger = (req: Request, res: Response, next: NextFunction): void => {
  //use cont instead of let to use lint error
  const url = req.url;
  console.log(url + ' visited');
  next();
};

export default logger;
