import { GetUserByUserNameQueryHandler } from './get-user/user-by-username';
import { CreateUserHandler } from './register-user/create-user';

export const Commands = [CreateUserHandler];
export const Queries = [GetUserByUserNameQueryHandler];
