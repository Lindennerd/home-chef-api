import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TransactionRunner {
  constructor(private sequelize: Sequelize) {}
  async runTransaction(autoCallback: (t: Transaction) => PromiseLike<void>) {
    const t = await this.sequelize.transaction();
    try {
      await autoCallback(t);
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
