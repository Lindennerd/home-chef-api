export class CreateDinnerCommand<TId> {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly date: Date,
    readonly duration: number,
    readonly max_guests: number,
    readonly host: TId,
    readonly address: TId,
  ) {}
}

export class UpdateDinnerCommand<TId> {
  constructor(
    readonly id: TId,
    readonly dinner: Partial<CreateDinnerCommand<TId>>,
  ) {}
}

export class CancelDinnerCommand<TId> {
  constructor(readonly id: TId) {}
}

export class ConfirmDinnerCommand<TId> {
  constructor(readonly id: TId) {}
}

export class ReScheduleDinnerCommand<TId> {
  constructor(readonly id: TId, readonly date: Date) {}
}
