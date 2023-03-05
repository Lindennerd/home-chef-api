import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../auth/auth.module';
import { DinnerModule } from '../dinner/dinner.module';
import { GuestController } from './guest.controller';
import { AttendToDinnerHandler } from './use-cases/attend-dinner';
import { MyDinnersAsGuestQueryHandler } from './use-cases/queries/my-dinners';

@Module({
  imports: [AuthModule, CqrsModule, DinnerModule],
  providers: [AttendToDinnerHandler, MyDinnersAsGuestQueryHandler],
  controllers: [GuestController],
})
export class GuestModule {}
