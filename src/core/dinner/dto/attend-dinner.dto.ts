import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AttendToDinnerDto {
  @ApiProperty()
  @IsNotEmpty()
  dinner_id: string;
}
