import { Injectable } from '@nestjs/common';
import { DinnerAggregate } from '../dinner.aggregate';
import { DinnerModel } from '../models/dinner.model';

@Injectable()
export class DinnerMappingProfile {
  map(model: DinnerModel): DinnerAggregate {
    return new DinnerAggregate(
      model.id,
      model.title,
      model.description,
      model.scheduled_for,
      model.duration_in_hours,
      model.max_guests,
      model.host_id,
      model.location,
    );
  }
}
