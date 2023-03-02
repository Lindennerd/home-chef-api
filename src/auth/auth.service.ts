import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { CryptService } from './crypt';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { AccountModel } from './models/auth.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AccountModel) private accountModel: typeof AccountModel,
    private readonly jwtService: JwtService,
    private readonly crypt: CryptService,
  ) {}
  private logger = new Logger(AuthService.name);

  async register(userRegistration: UserRegistrationDto) {
    const { accountInformation } = userRegistration;

    if (
      accountInformation.password !== accountInformation.passwordConfirmation
    ) {
      throw new BadRequestException('Passwords do not match');
    }

    if (
      (await this.accountModel.count({
        where: { username: accountInformation.username },
      })) > 0
    ) {
      throw new BadRequestException('Username already exists');
    }

    throw new Error('Method not implemented.');
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountModel.findOne({
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
