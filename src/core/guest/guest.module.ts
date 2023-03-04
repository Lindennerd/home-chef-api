import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../auth/auth.module';
import { GuestController } from './guest.controller';

@Module({
  imports: [AuthModule, CqrsModule],
  controllers: [GuestController],
})
export class GuestModule {}
