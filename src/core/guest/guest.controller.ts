import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { MyDinnersDto } from './dto/my-dinners.dto';
import { AttendToDinnerCommand } from './use-cases/attend-dinner';
import { CancelAttendenceCommand } from './use-cases/cancel-attendence';
import { MyDinnersAsGuestQuery } from './use-cases/queries/my-dinners';

@ApiTags('Guest')
@Controller('guest')
export class GuestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiBearerAuth()
  @ApiParam({ name: 'dinnerId', type: 'number' })
  @UseGuards(AuthGuard('jwt'))
  @Post('attend-to/:dinnerId')
  async attendToDinner(
    @Request() req: any,
    @Param('dinnerId') dinnerId: number,
  ) {
    return this.commandBus.execute(
      new AttendToDinnerCommand(dinnerId, req.user.userId),
    );
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'dinnerId', type: 'number' })
  @UseGuards(AuthGuard('jwt'))
  @Post('cancel-attendence/:dinnerId')
  async cancelAttendence(
    @Request() req: any,
    @Param('dinnerId') dinnerId: number,
  ) {
    return this.commandBus.execute(
      new CancelAttendenceCommand(dinnerId, req.user.userId),
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('my-dinners')
  async myDinners(@Request() req: any, @Query() myDinners: MyDinnersDto) {
    return this.queryBus.execute(
      new MyDinnersAsGuestQuery(
        myDinners.page,
        myDinners.limit,
        myDinners.filter,
        req.user.userId,
      ),
    );
  }
}
