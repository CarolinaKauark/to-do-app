import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../helpers/token';
import User from '../database/models/User';
import ErrorGenerate from '../helpers/errorGenerate';
import checkPassword from '../helpers/bcrypt';
import { ILogin, IUser, IUserService } from 'src/interfaces/user.interfaces';

class UserService implements IUserService {
  constructor(private userModel = User) {}

  async login(body: ILogin): Promise<string> {
    const user = await this.userModel.findOne({ where: { email: body.email } });

    if (!user || !checkPassword(body.password, user.password)) {
      throw new ErrorGenerate('Incorrect email or password', StatusCodes.UNAUTHORIZED);
    }

    const { email, id, firstName, lastName } = user;
    const token = generateToken({ email, id, firstName, lastName });
    return token;
  }

  async register(body: IUser): Promise<string> {
    const user = await this.userModel.create({...body});
    const { email, id, firstName, lastName } = user;
    const token = generateToken({ email, id, firstName, lastName });
    return token;
  }
}

export default UserService;
