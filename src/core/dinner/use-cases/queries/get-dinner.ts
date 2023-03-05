import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { DinnerModel } from '../../models/dinner.model';

export class GetDinnerQuery {
  constructor(public dinner_id: number) {}
}

@QueryHandler(GetDinnerQuery)
export class GetDinnerQueryHandler implements IQueryHandler<GetDinnerQuery> {
  constructor(
    @InjectModel(DinnerModel) private dinnerModel: typeof DinnerModel,
  ) {}

  async execute(query: GetDinnerQuery): Promise<DinnerModel> {
    return await this.dinnerModel.findByPk(query.dinner_id, {
      include: [
        DinnerModel.associations.location,
        DinnerModel.associations.guests,
        DinnerModel.associations.host,
      ],
    });
  }
}
