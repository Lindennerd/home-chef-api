import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserCommand } from 'src/user/use-cases/create-user';
import { AuthService } from './auth.service';
import { UserRegistrationDto } from './dto/user-registration.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('register')
  async register(@Body() userRegistration: UserRegistrationDto) {
    if (
      userRegistration.account.password !==
      userRegistration.account.passwordConfirmation
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    return await this.commandBus.execute(
      new CreateUserCommand(
        userRegistration.user.name,
        userRegistration.user.email,
        userRegistration.user.phone,
        userRegistration.account.username,
        userRegistration.account.password,
        userRegistration.user.address,
      ),
    );
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any): Promise<{ access_token: string }> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() req) {
    return req.user;
  }
}
