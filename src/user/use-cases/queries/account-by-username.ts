import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { AccountModel } from '../../models/account.model';

export class GetAccountByUserNameQuery {
  constructor(public readonly username: string) {}
}

@QueryHandler(GetAccountByUserNameQuery)
export class GetAccountByUserNameQueryHandler
  implements IQueryHandler<GetAccountByUserNameQuery>
{
  constructor(
    @InjectModel(AccountModel) private accountModel: typeof AccountModel,
  ) {}

  async execute(query: GetAccountByUserNameQuery): Promise<any> {
    return await this.accountModel.findOne({
      where: { username: query.username },
    });
  }
}
