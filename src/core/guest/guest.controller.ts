import { Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AttendToDinnerCommand } from './use-cases/attend-dinner';

@ApiTags('Guest')
@Controller('guest')
export class GuestController {
  constructor(private readonly commandBus: CommandBus) {}

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
}
