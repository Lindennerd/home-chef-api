import { CreateUserHandler } from './create-user';
import { GetAccountByUserNameQueryHandler } from './queries/account-by-username';

export const Commands = [CreateUserHandler];
export const Queries = [GetAccountByUserNameQueryHandler];
