import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetDinnerQuery } from './use-cases/queries/get-dinner';

@ApiTags('Dinner')
@Controller('dinner')
export class DinnerController {
  constructor(private queryBus: QueryBus) {}

  private logger = new Logger('DinnerController');

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':dinnerId')
  async getDinner(@Param('dinnerId') dinnerId: number) {
    return await this.queryBus.execute(new GetDinnerQuery(dinnerId));
  }
}
