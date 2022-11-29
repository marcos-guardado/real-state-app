import { IUser } from '../interfaces/user.interface';

export const validateUserRol = (user: IUser, roleRequired: string) =>
  user.role === roleRequired;
