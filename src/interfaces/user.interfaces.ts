export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  firstName: string;
  lastName: string;
}

export interface IRegister {
  id?: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}


export interface IUserService {
  login(body: ILogin): Promise<IRegister | void>;
  register(body: IUser): Promise<IRegister | void>;
  validate(email: string, firstName: string): Promise<boolean>;
}
