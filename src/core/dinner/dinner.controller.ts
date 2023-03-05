import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Dinner')
@Controller('dinner')
export class DinnerController {
  constructor(private commandBus: CommandBus) {}

  private logger = new Logger('DinnerController');
}
