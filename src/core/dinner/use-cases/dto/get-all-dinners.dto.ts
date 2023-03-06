import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';

export class GetAllDinnerDto {
  @ApiProperty({ default: 1 })
  @Min(1)
  page: number;

  @ApiProperty({ default: 10 })
  @Min(1)
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  filter: string;
}
