import * as sequelize from 'sequelize';
import { Column, Model, Table } from 'sequelize-typescript';
import { Dinner } from 'src/core/domain';

@Table({ tableName: 'dinner', timestamps: true })
export class DinnerModel extends Model<
  Dinner<string>,
  Omit<Dinner<string>, 'id'>
> {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: 'uuid',
    defaultValue: sequelize.DataTypes.UUIDV4,
  })
  id: string;

  @Column({ allowNull: false })
  scheduled_for: Date;
}
