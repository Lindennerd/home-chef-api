import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../auth/auth.module';
import { HostController } from './host.controller';

@Module({
  imports: [AuthModule, CqrsModule],
  controllers: [HostController],
})
export class HostModule {}
