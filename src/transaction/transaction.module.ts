import { Global, Module } from '@nestjs/common';
import { Sequelize } from 'src/imports';
import { TransactionRunner } from './transaction-runner';

@Global()
@Module({
  imports: [Sequelize],
  providers: [TransactionRunner],
  exports: [TransactionRunner],
})
export class TransactionModule {}
