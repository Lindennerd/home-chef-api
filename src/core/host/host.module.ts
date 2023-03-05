import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../auth/auth.module';
import { UserModule } from '../../user/user.module';
import { DinnerModule } from '../dinner/dinner.module';
import { HostController } from './host.controller';
import { useCases } from './use-cases/index';

@Module({
  imports: [AuthModule, CqrsModule, DinnerModule, UserModule],
  providers: [...useCases],
  controllers: [HostController],
})
export class HostModule {}
