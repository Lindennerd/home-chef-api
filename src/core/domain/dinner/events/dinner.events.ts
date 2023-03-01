export class DinnerConfirmed<TId> {
  constructor(
    public readonly dinnerId: TId,
    public readonly locationId: TId,
    public readonly date: Date,
  ) {}
}

export class DinnerCancelled<TId> {
  constructor(public readonly dinnerId: TId) {}
}

export class DinnerReScheduled<TId> {
  constructor(public readonly dinnerId: TId, public readonly date: Date) {}
}
