import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { DinnerModel } from '../../models/dinner.model';

export class GetDinnersQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter: string,
  ) {}
}

@QueryHandler(GetDinnersQuery)
export class GetDinnersQueryHandler
  implements IQueryHandler<GetDinnersQuery, DinnerModel[]>
{
  constructor(
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
  ) {}

  execute(query: GetDinnersQuery): Promise<DinnerModel[]> {
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
        DinnerModel.associations.location,
        DinnerModel.associations.guests,
      ],
    });
  }
}
