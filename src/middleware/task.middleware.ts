import { NextFunction, Request, RequestHandler, Response } from 'express';
import ErrorGenerate from '../helpers/errorGenerate';
import { StatusCodes } from 'http-status-codes';
import TaskService from 'src/services/task.service';


export const taskValidate: RequestHandler = (req, res, next) => {
  const { description, startTime, endTime } = req.body;

  if (!description || !startTime || !endTime) {
    throw new ErrorGenerate('All fields must be filled', StatusCodes.BAD_REQUEST);
  } 

  next();
};
