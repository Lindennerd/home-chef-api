export class CreateUserCommand<TId> {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly address: TId,
  ) {}
}

export class UpdateUserCommand<TId> {
  constructor(
    readonly id: TId,
    readonly user: Partial<CreateUserCommand<TId>>,
  ) {}
}

export class AttendToADinnerCommand<TId> {
  constructor(readonly id: TId, readonly eventId: TId) {}
}

export class ConfirmAttendenceToADinnerCommand<TId> {
  constructor(readonly id: TId, readonly eventId: TId) {}
}

export class CancelAttendenceToADinnerCommand<TId> {
  constructor(readonly id: TId, readonly eventId: TId) {}
}

export class EvaluateDinnerHostCommand<TId> {
  constructor(
    readonly id: TId,
    readonly eventId: TId,
    readonly rating: number,
  ) {}
}

export class EvaluateDinnerGuestCommand<TId> {
  constructor(
    readonly id: TId,
    readonly eventId: TId,
    readonly guest: TId,
    readonly rating: number,
  ) {}
}

export class EvaluateDinnerCommand<TId> {
  constructor(
    readonly id: TId,
    readonly eventId: TId,
    readonly rating: number,
  ) {}
}
