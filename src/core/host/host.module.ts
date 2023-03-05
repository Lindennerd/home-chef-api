import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../user/user.module';
import { DinnerModule } from '../dinner/dinner.module';
import { HostController } from './host.controller';
import {
  AlterDinnerStatusCommandHandler,
  MyDinnersAsHostQueryHandler,
  NewDinnerHandler,
} from './use-cases';

@Module({
  imports: [AuthModule, CqrsModule, DinnerModule, UserModule],
  providers: [
    NewDinnerHandler,
    MyDinnersAsHostQueryHandler,
    AlterDinnerStatusCommandHandler,
  ],
  controllers: [HostController],
})
export class HostModule {}
