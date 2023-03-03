import { ApiProperty } from '@nestjs/swagger';
import {
  Contains,
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPhoneNumber,
  MinLength,
  NotContains,
} from 'class-validator';

export class AccountInformationDto {
  @ApiProperty()
  @IsNotEmpty()
  @NotContains(' ', { message: 'Username cannot contain spaces' })
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @NotContains(' ', { message: 'Password cannot contain spaces' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Contains('!', {
    message: 'Password must contain at least one special character',
  })
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  passwordConfirmation: string;
}
export class UserAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  street: string;
  @ApiProperty()
  @IsNotEmpty()
  neighborhood: string;
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  @ApiProperty()
  @IsNotEmpty()
  state: string;
  @ApiProperty()
  @IsNotEmpty()
  zip: string;
  @ApiProperty()
  @IsNotEmpty()
  number: string;
  @ApiProperty()
  @IsNotEmpty()
  latitude: number;
  @ApiProperty()
  @IsNotEmpty()
  longitude: number;
  @ApiProperty()
  @IsNotEmpty()
  address_complement: string;
}

export class UserInformationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('BR', { message: 'Invalid phone number' })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmptyObject()
  address: UserAddressDto;
}

export class UserRegistrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmptyObject()
  account: AccountInformationDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmptyObject()
  user: UserInformationDto;
}
