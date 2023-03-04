import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { DinnerAggregate } from '../dinner.aggregate';
import { DinnerModel } from '../models/dinner.model';

@Injectable()
export class DinnerMappingProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, DinnerModel, DinnerAggregate);
    };
  }
}
