import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class DinnerLocationDto {
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

export class NewDinnerDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  scheduled_for: Date;
  @ApiProperty()
  @IsNotEmpty()
  durantion_in_hours: number;
  @ApiProperty()
  @IsNotEmpty()
  max_guests: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNotEmptyObject()
  location: DinnerLocationDto;
}
