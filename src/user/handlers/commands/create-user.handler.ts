import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserCommand } from 'src/core/domain/user/commands/user.commands';
import { User } from 'src/core/domain/user/user';
import { UserModel } from 'src/user/models/user.model';
import { UserProfile } from '../../mappings/user.profile';

@Injectable()
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand<number>>
{
  constructor(
    @InjectModel(UserModel)
    private readonly userRepository: typeof UserModel,
    @InjectMapper()
    private readonly mapper: UserProfile,
  ) {}

  async execute(command: CreateUserCommand<number>): Promise<User<number>> {
    const user = new UserModel();
    user.name = command.name;
    user.email = command.email;
    user.phone = command.phone;

    const userModel = await this.userRepository.create(user, {
      include: [
        UserModel.associations.account,
        UserModel.associations.hosted_events,
        UserModel.associations.attended_events,
      ],
    });

    return this.mapper.mapToEntity(userModel);
  }
}
