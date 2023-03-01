import { QueryManyBase } from '../../common/query.base';

export class UserByNameQuery {
  constructor(public readonly name: string) {}
}

export class UserByEmailQuery {
  constructor(public readonly email: string) {}
}

export class UserByPhoneQuery {
  constructor(public readonly phone: string) {}
}

export class UserByIdQuery {
  constructor(public readonly id: string) {}
}

export class UserHostedEventsQuery extends QueryManyBase {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly id: string,
  ) {
    super(page, pageSize);
  }
}

export class UserAttendedEventsQuery extends QueryManyBase {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly id: string,
  ) {
    super(page, pageSize);
  }
}
