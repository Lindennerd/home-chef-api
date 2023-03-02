import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/core/domain/user/user';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserProfile {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  mapToEntity(userModel: UserModel): User<number> {
    return this.mapper.map(userModel, UserModel, User<number>);
  }

  mapToModel(user: User<number>): UserModel {
    return this.mapper.map(user, User<number>, UserModel);
  }
}
