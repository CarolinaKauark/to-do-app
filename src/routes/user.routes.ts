import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

import User from '../database/models/User';
import loginValidate from '../middleware/login.middleware';

const userRouter = Router();
const userService = new UserService(User)
const userController = new UserController(userService)
// userRouter.post('/login', (req, res, next) => {
//     loginValidate(req, res, next);
//     meuOutroMiddleware(req, res, next);
//   });

userRouter.post('/login', loginValidate, userController.login);
userRouter.post('/register', userController.register);


export default userRouter;