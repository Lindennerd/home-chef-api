import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUserByUserNameQuery {
  constructor(public readonly username: string) {}
}

@QueryHandler(GetUserByUserNameQuery)
export class GetUserByUserNameQueryHandler
  implements IQueryHandler<GetUserByUserNameQuery>
{
  execute(query: GetUserByUserNameQuery): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
