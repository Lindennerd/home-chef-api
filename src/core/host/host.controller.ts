import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DinnerStatus } from '../dinner/models/dinner.model';
import { AlterDinnerStatusDto } from './dto/alter-dinner-status.dto';
import { MyDinnersDto } from './dto/my-dinners.dto';
import { NewDinnerDto } from './dto/new-dinner.dto';
import { AlterDinnerStatusCommand } from './use-cases';
import { NewDinner } from './use-cases/create-dinner';
import { MyDinnersAsHostQuery } from './use-cases/queries/my-dinners';

@ApiBearerAuth()
@ApiTags('Host')
@Controller('host')
export class HostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('new-dinner')
  async create(@Body() dinnerDto: NewDinnerDto, @Request() req: any) {
    return await this.commandBus.execute(
      new NewDinner(
        dinnerDto.title,
        dinnerDto.description,
        dinnerDto.scheduled_for,
        dinnerDto.durantion_in_hours,
        dinnerDto.max_guests,
        req.user.userId,
        dinnerDto.location,
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('update-dinner-status')
  async alterStatus(
    @Body() alterStatusDto: AlterDinnerStatusDto,
    @Request() req: any,
  ) {
    return await this.commandBus.execute(
      new AlterDinnerStatusCommand(
        alterStatusDto.dinner_id,
        req.user.userId,
        alterStatusDto.status as DinnerStatus,
      ),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('my-dinners')
  async myDinners(@Request() req: any, @Query() myDinnersQuery: MyDinnersDto) {
    return await this.queryBus.execute(
      new MyDinnersAsHostQuery(
        myDinnersQuery.page,
        myDinnersQuery.limit,
        myDinnersQuery.filter,
        req.user.userId,
      ),
    );
  }
}
