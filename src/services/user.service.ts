import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../helpers/token';
import User from '../database/models/User';
import ErrorGenerate from '../helpers/errorGenerate';
import {checkPassword, crypto } from '../helpers/bcrypt';
import { ILogin, IRegister, IUser, IUserService } from 'src/interfaces/user.interfaces';

class UserService implements IUserService {
  constructor(private userModel = User) {}

  async login(body: ILogin): Promise<IRegister> {
    const user = await this.userModel.findOne({ where: { email: body.email } });

    if (!user || !checkPassword(body.password, user.password)) {
      throw new ErrorGenerate('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }

    const { email, id, firstName, lastName } = user;
    const token = generateToken({ email, id, firstName, lastName });
    return {token, firstName, email, lastName, id};
  }

  async register(body: IUser): Promise<IRegister> {
    const { email, firstName, lastName, password } = body;

    const user = await this.userModel.findOne({ where: { email } });
    if(user) throw new ErrorGenerate('This user are already registered', StatusCodes.CONFLICT);

    const hashPassword = crypto(password);

    const newUser = await this.userModel.create({ email, firstName, lastName, password: hashPassword});

    const token = await generateToken({ email, id: newUser.id, firstName, lastName });
    
    return { token, email, firstName, id: newUser.id, lastName };
  }

  async validate(email: string, firstName: string): Promise<boolean> {
    const hasUser = await this.userModel.findOne({ where: { email, firstName } });

    if(!hasUser) throw new ErrorGenerate('This user does not exist', StatusCodes.NOT_FOUND);
    return true;
  }
}

export default UserService;
