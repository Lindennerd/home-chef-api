import { QueryManyBase } from '../../common/query.base';
export class DinnerByIdQuery {
  constructor(public readonly id: string) {}
}

export class DinnerByHostQuery extends QueryManyBase {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly hostId: string,
  ) {
    super(page, pageSize);
  }
}

export class DinnerByDayQuery extends QueryManyBase {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly date: Date,
  ) {
    super(page, pageSize);
  }
}

export class DinnerByMonthQuery extends QueryManyBase {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly date: Date,
  ) {
    super(page, pageSize);
  }
}

export class DinnerByTitleFullTextQuery extends QueryManyBase {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly title: string,
  ) {
    super(page, pageSize);
  }
}
