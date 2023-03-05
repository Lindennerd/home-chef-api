import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionRunner {
  constructor(private sequelize: Sequelize) {}
  async runTransaction(autoCallback: (t: Transaction) => PromiseLike<void>) {
    try {
      return await this.sequelize.transaction(async (t: Transaction) => {
        return await autoCallback(t);
      });
    } catch (error) {
      throw error;
    }
  }
}
