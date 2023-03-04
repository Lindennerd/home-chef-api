import { GetAccountByUserNameQueryHandler } from './get-account/account-by-username';
import { CreateUserHandler } from './register-user/create-user';

export const Commands = [CreateUserHandler];
export const Queries = [GetAccountByUserNameQueryHandler];
