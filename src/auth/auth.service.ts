import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { GetUserByUserNameQuery } from 'src/user/use-cases/get-user/user-by-username';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}
  private logger = new Logger(AuthService.name);

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.queryBus.execute(
      new GetUserByUserNameQuery(username),
    );

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
