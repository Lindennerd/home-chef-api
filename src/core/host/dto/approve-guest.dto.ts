import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class ApproveGuestDto {
  @ApiProperty()
  @IsNotEmpty()
  dinner_id: number;

  @ApiProperty()
  guest_id: number;
}
