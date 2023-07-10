import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty({ message: '유저 식별자를 전달해야합니다.', })
  @ApiProperty({ description: '유저 식별자', example: 1, })
  userId: number;

  @IsNotEmpty({ message: '할 일을 입력해야합니다.', })
  @ApiProperty({ description: '할 일', example: '할 일', })
  content: string;
}
