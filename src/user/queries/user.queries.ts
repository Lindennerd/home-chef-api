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

export class UserHostedEventsQuery {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly id: string,
  ) {}
}

export class UserAttendedEventsQuery {
  constructor(
    public page: number,
    public pageSize: number,
    public readonly id: string,
  ) {}
}
