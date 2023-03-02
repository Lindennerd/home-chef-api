import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';
import { CryptService } from './crypt';
import { AccountModel } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AccountModel) accountModel: Model<AccountModel>,
    private readonly jwtService: JwtService,
    private readonly crypt: CryptService,
  ) {}

  private logger = new Logger(AuthService.name);

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await AccountModel.findOne({
      where: { username },
    });

    if (user && (await this.crypt.comparePassword(pass, user.password))) {
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
