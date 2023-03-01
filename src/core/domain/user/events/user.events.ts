export class UserAttendedToADinnerEvent<TId> {
  constructor(readonly userId: TId, readonly eventId: TId) {}
}

export class EvaluateDinnerHost<TId> {
  constructor(
    readonly userId: TId,
    readonly eventId: TId,
    readonly rating: number,
  ) {}
}

export class EvaluateDinnerGuest<TId> {
  constructor(
    readonly userId: TId,
    readonly eventId: TId,
    readonly guest: TId,
    readonly rating: number,
  ) {}
}

export class EvaluateDinner<TId> {
  constructor(readonly eventId: TId, readonly rating: number) {}
}

export class UserConfirmedAttendenceToADinnerEvent<TId> {
  constructor(readonly userId: TId, readonly eventId: TId) {}
}

export class UserCancelledAttendenceToADinnerEvent<TId> {
  constructor(readonly userId: TId, readonly eventId: TId) {}
}
