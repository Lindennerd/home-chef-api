# Commands

```typescript
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

```

# Events

```typescript
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
```

# JSON Samples

## (POST) api/auth/register

```json
{
  "account": {
    "username": "lindennerd",
    "password": "123",
    "passwordConfirmation": "123"
  },
  "user": {
    "name": "Luiz Paulo",
    "email": "lindennerd@gmail.com",
    "phone": "51985106925",
    "address": {
      "street": "Costa Gama",
      "neighborhood": "Restinga",
      "city": "Porto Alegre",
      "state": "RS",
      "zip": "94838610",
      "number": "5124",
      "latitude": 11112223333,
      "longitude": 1112222333,
      "address_complement": "casa 160"
    }
  }
}
```