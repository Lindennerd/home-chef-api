import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NewDinnerDto } from './dto/new-dinner.dto';
import { NewDinner } from './use-cases/create-dinner';

@ApiBearerAuth()
@ApiTags('Host')
@Controller('host')
export class HostController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
