import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserIdDTO {
  @IsNotEmpty({ message: '유저 식별자를 입력해야합니다.', })
  @IsNumber({}, { message: '유저 식별자는 숫자여야합니다.', })
  @ApiProperty({ description: '유저 식별자', example: 1, })
  userId: number;
}
