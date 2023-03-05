import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { DinnerModel } from 'src/core/dinner/models/dinner.model';
import { UserModel } from '../../../../user/models/user.model';

export class MyDinnersAsGuestQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter: string,
    public readonly user_id: number,
  ) {}
}

@QueryHandler(MyDinnersAsGuestQuery)
export class MyDinnersAsGuestQueryHandler
  implements IQueryHandler<MyDinnersAsGuestQuery, DinnerModel[]>
{
  constructor(
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
  ) {}

  execute(query: MyDinnersAsGuestQuery): Promise<DinnerModel[]> {
    const { page, limit, filter } = query;
    const offset = (page - 1) * limit;
    return this.dinnerModel.findAll({
      where: {
        [Op.or]: {
          title: { [Op.like]: `%${filter ?? ''}%` },
          description: { [Op.like]: `%${filter ?? ''}%` },
        },
      },
      offset,
      limit,
      include: [
        DinnerModel.associations.host,
        DinnerModel.associations.location,
        { model: UserModel, as: 'guests', where: { id: query.user_id } },
      ],
    });
  }
}
