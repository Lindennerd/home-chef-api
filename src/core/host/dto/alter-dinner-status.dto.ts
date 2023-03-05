import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DinnerStatus } from '../../dinner/models/dinner.model';

export class AlterDinnerStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  dinner_id: number;

  @ApiProperty({ enum: DinnerStatus, enumName: 'DinnerStatus' })
  @IsNotEmpty()
  status: string;
}
