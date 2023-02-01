import { NextFunction, Request, RequestHandler, Response } from 'express';
import ErrorGenerate from '../helpers/errorGenerate';
import { StatusCodes } from 'http-status-codes';


const userValidate: RequestHandler = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorGenerate('All fields must be filled', StatusCodes.BAD_REQUEST);
  }

  next();
};

export default userValidate;
