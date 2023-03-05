import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AccountModel } from '../../../user/models/account.model';
import { DinnerModel } from './dinner.model';

export enum DinnerNotificationType {
  AttendenceRequested = 'AttendenceRequested',
  AttendenceAccepted = 'AttendenceAccepted',
  AttendenceRejected = 'AttendenceRejected',
  AttendenceCanceled = 'AttendenceCanceled',
  AttendenceConfirmed = 'AttendenceConfirmed',
}

@Table({ tableName: 'dinner_notifications', timestamps: true })
export class DinnerNotificationsModel extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @ForeignKey(() => DinnerModel)
  @Column({ allowNull: false })
  dinner_id: number;

  @BelongsTo(() => DinnerModel)
  dinner: DinnerModel;

  @ForeignKey(() => AccountModel)
  @Column({ allowNull: false })
  guest_id: number;

  @BelongsTo(() => AccountModel)
  guest: AccountModel;

  @Column({ allowNull: false, values: Object.values(DinnerNotificationType) })
  type: string;
}
