import { Injectable } from '@nestjs/common';

//!TODO - This is a stub.  It needs to be implemented.

@Injectable()
export class MapperService<Model, IEntity> {
  createEntity(model: Model): IEntity {
    return {} as IEntity;
  }

  createModel(entity: IEntity): Model {
    return {} as Model;
  }
}
