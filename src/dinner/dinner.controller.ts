import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDinnerDto } from './dto/create-dinner.dto';
import { CreateDinnerCommand } from './use-cases/create-dinner';

@ApiTags('Dinner')
@Controller('dinner')
export class DinnerController {
  constructor(private commandBus: CommandBus) {}

  private logger = new Logger('DinnerController');

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async create(@Body() createDinnerDto: CreateDinnerDto, @Request() req: any) {
    this.logger.debug(
      `Creating a dinner for the host ${JSON.stringify(
        req.user,
      )} scheduled for ${createDinnerDto.scheduled_for}`,
    );
    return await this.commandBus.execute(
      new CreateDinnerCommand(
        createDinnerDto.title,
        createDinnerDto.description,
        createDinnerDto.scheduled_for,
        createDinnerDto.durantion_in_hours,
        createDinnerDto.max_guests,
        req.user.userId,
        createDinnerDto.location,
      ),
    );
  }
}
