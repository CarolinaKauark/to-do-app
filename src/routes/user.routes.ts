import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import User from '../database/models/User';
import userValidate from '../middleware/user.middleware';
import authorizationToken from '../middleware/auth.middleware';


const userRouter = Router();
const userService = new UserService(User)
const userController = new UserController(userService)

userRouter.post('/login', userValidate, userController.login);
userRouter.post('/register', userValidate ,userController.register);
userRouter.post('/validate', authorizationToken, userController.validate);


export default userRouter;