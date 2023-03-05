import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { DinnerModel } from 'src/core/dinner/models/dinner.model';

export class MyDinnersAsHostQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter: string,
    public readonly user_id: number,
  ) {}
}

@QueryHandler(MyDinnersAsHostQuery)
export class MyDinnersAsHostQueryHandler
  implements IQueryHandler<MyDinnersAsHostQuery, DinnerModel[]>
{
  constructor(
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
  ) {}

  execute(query: MyDinnersAsHostQuery): Promise<DinnerModel[]> {
    const { page, limit, filter } = query;
    const offset = (page - 1) * limit;
    return this.dinnerModel.findAll({
      where: {
        host_id: query.user_id,
        [Op.or]: {
          title: { [Op.like]: `%${filter ?? ''}%` },
          description: { [Op.like]: `%${filter ?? ''}%` },
        },
      },
      offset,
      limit,
      include: [
        DinnerModel.associations.location,
        DinnerModel.associations.guests,
      ],
    });
  }
}
